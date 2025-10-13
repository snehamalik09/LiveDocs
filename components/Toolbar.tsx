'use client'

import React from 'react'
import ToolBarButton from './ToolBarButton'
import { BoldIcon, ItalicIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, SpellCheckIcon, UnderlineIcon, Undo2Icon, ChevronDownIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Separator } from './ui/separator'
import FontFamilyButton from './FontFamilyButton';
import HeadingButton from './HeadingButton'
import TextColorButton from './TextColorButton'
import HighlightButton from './HighlightButton'
import LinkButton from './LinkButton'
import ImageButton from './ImageButton'
import AlignButton from './AlignButton'
import FontSizeButton from './FontSizeButton'
import LineHeightButton from './LineHeightButton'


const Toolbar = () => {
  const {editor, autosaving} = useSelector((state: RootState) => state.editor);


  const section: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
    icon: LucideIcon;
  }[][] = [[

    {
      label: 'Undo',
      icon: Undo2Icon,
      onClick: () => editor?.chain().focus().undo().run(),
    },
    {
      label: 'Redo',
      icon: Redo2Icon,
      onClick: () => editor?.chain().focus().redo().run(),
    },
    {
      label: 'Print',
      icon: PrinterIcon,
      onClick: () => window.print(),
    },
    {
      label: 'Spell Check',
      icon: SpellCheckIcon,
      onClick: () => {
        const current = editor?.view.dom.getAttribute("spellcheck");
        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
      },
    },
  ],

  [
    {
      label: 'Bold',
      icon: BoldIcon,
      isActive: editor?.isActive("bold"),
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      label: 'Italic',
      icon: ItalicIcon,
      isActive: editor?.isActive("italic"),
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      label: 'Underline',
      icon: UnderlineIcon,
      isActive: editor?.isActive("underline"),
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
    },
  ],

  [
    {
      label: 'Comment',
      icon: MessageSquarePlusIcon,
      isActive: false,
      onClick: () => console.log("comment"),
    },
  ]

    ]
  return (
    <div className="w-full bg-gray-50 mb-[5vh] bg-dark-100 border-b-2 border-gray-500 rounded-t-md flex items-center gap-3 p-3 shadow-sm">
      {section[0].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}

      <Separator orientation='vertical' className='!h-6 !bg-gray-300' />
      <FontFamilyButton/>

      <Separator orientation='vertical' className='!h-6 !bg-gray-300' />
      <HeadingButton/>

      <Separator orientation='vertical' className='!h-6 !bg-gray-300' />
      <FontSizeButton/>

      {section[1].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}

      <TextColorButton/>
      <HighlightButton/>
      <Separator orientation='vertical' className='!h-6 !bg-gray-300' />
      <LinkButton/>
      <ImageButton/>
      <AlignButton/>
      <LineHeightButton/>
      
      {/* LIST */}

      {section[2].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}

       <Separator orientation='vertical' className='!h-6 !bg-gray-300' />

      {autosaving && (  <>    
 <p className='text-gray-500'> Autosaving... </p> </> )}
      

    </div>
  )
}

export default Toolbar

    
