"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "../../lib/utils"
import { Grid3X3, Layers, LayoutList } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50

export function Component({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      // Swiped left - go to next card
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      // Swiped right - go to previous card
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse() // Reverse so top card renders last (on top)
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8, // Reduced spacing for tighter stack
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: stackPosition % 2 === 0 ? 1 : -1, // Subtle random-ish rotation
          scale: 1 - stackPosition * 0.05,
          filter: stackPosition === 0 ? "brightness(1)" : "brightness(0.5)", // Dim background cards
          opacity: 1, // Always opaque
        }
      case "grid":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
          scale: 1,
          filter: "none",
          opacity: 1,
        }
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
          scale: 1,
          filter: "none",
          opacity: 1,
        }
    }
  }

  const containerStyles = {
    stack: "relative h-64 w-64 md:h-72 md:w-80",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
    list: "flex flex-col gap-3",
  }

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("space-y-4", className)}>
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-1 rounded-lg bg-white/5 p-1 w-fit mx-auto mb-8 border border-white/10">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={cn(
                "rounded-md p-2 transition-all",
                layout === mode
                  ? "bg-[#f5c14b] text-black shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/10",
              )}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Cards Container */}
      <LayoutGroup>
        <motion.div layout className={cn(containerStyles[layout], "mx-auto w-full")}>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0

              // Calculate final scale logic
              const baseScale = styles.scale || 1
              const finalScale = isExpanded ? 1.05 : baseScale

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: finalScale,
                    x: 0,
                    top: styles.top,
                    left: styles.left,
                    zIndex: styles.zIndex,
                    rotate: styles.rotate,
                    filter: styles.filter
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -200 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  onClick={() => {
                    if (isDragging) return
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl border border-white/10 bg-[#0c0d16] p-6 absolute shadow-2xl",
                    "hover:border-[#f5c14b]/50 transition-colors",
                    layout === "stack" && "w-72 h-64 md:w-80 md:h-72",
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full min-h-[220px] relative",
                    layout === "list" && "w-full relative",
                    isExpanded && "ring-2 ring-[#f5c14b] z-50",
                  )}
                  style={{
                    // Removed transparent background override to use solid bg-[#0c0d16]
                    borderColor: card.color ? `${card.color}40` : undefined,
                    boxShadow: isTopCard && card.color ? `0 10px 30px -10px ${card.color}20` : undefined,
                  }}
                >
                  <div className="flex flex-col gap-4 h-full">
                    {card.icon && (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/5 text-foreground">
                         <div style={{ color: card.color || '#f5c14b' }}>
                             {card.icon}
                         </div>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-white truncate mb-2">{card.title}</h3>
                      <p
                        className={cn(
                          "text-sm text-gray-400",
                          layout === "stack" && "line-clamp-4",
                          layout === "grid" && "",
                          layout === "list" && "line-clamp-2",
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {isTopCard && (
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <span className="text-xs text-gray-500/50 uppercase tracking-widest">Swipe to navigate</span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeIndex ? "w-6 bg-[#f5c14b]" : "w-2 bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
