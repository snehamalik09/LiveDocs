

import React from 'react'
import { cn } from '@/lib/utils'
import {LucideIcon} from 'lucide-react'
import { Button } from './ui/button'

interface ToolBarButtonProps {
    onClick : () => void;
    isActive?:boolean;
    icon: LucideIcon
}

const ToolBarButton = ({onClick, isActive, icon:Icon} : ToolBarButtonProps) => {
  return (
   <Button onClick={onClick} className={cn('text-sm cursor-pointer h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-2--/80', isActive && 'bg-neutral-200/80')}>
    <Icon size={4} />
   </Button>
  )
}

export default ToolBarButton
