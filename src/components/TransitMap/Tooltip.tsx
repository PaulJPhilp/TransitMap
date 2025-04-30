import { COLORS } from "./colors"
import type { HexColor } from "./colors.types"

interface TooltipProps {
    x: number
    y: number
    title: string
    subtitle?: string
    backgroundColor?: HexColor
    visible: boolean
}

export function Tooltip({
    x,
    y,
    title,
    subtitle,
    backgroundColor = COLORS.corporate.CORE_WHITE,
    visible
}: TooltipProps) {
    if (!visible) return null

    return (
        <g
            transform={`translate(${x + 10}, ${y - 10})`}
            style={{ pointerEvents: "none" }}
        >
            <rect
                x={0}
                y={0}
                width={subtitle ? 160 : 120}
                height={subtitle ? 50 : 30}
                rx={4}
                ry={4}
                fill={backgroundColor}
                stroke={COLORS.text.PRIMARY}
                strokeWidth={1}
                filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.2))"
            />
            <text
                x={8}
                y={20}
                fontSize={14}
                fontFamily="sans-serif"
                fill={COLORS.text.PRIMARY}
            >
                {title}
            </text>
            {subtitle && (
                <text
                    x={8}
                    y={40}
                    fontSize={12}
                    fontFamily="sans-serif"
                    fill={COLORS.text.SECONDARY}
                >
                    {subtitle}
                </text>
            )}
        </g>
    )
} 