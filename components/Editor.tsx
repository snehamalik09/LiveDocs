'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Strike from '@tiptap/extension-strike'
import { TableKit } from '@tiptap/extension-table'
import ImageResize from 'tiptap-extension-resize-image'
import { useDispatch } from "react-redux";
import { setEditor } from '@/store/editorSlice'
import Underline from '@tiptap/extension-underline'
import Text from '@tiptap/extension-text'
import { FontFamily, TextStyle  } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { FontSize } from './extensions/FontSize'
import { LineHeightExtension } from './extensions/LineHeight'

const Editor = () => {
  const dispatch = useDispatch();

  const editor = useEditor({
    editorProps: {
      attributes: {
        style: 'padding:56px',
        class: ' print:border-0 focus:outline-none  border-2 border-[#C7C7C7] flex flex-col min-h-screen '
      }
    },
    extensions: [StarterKit, Strike, LineHeightExtension, FontSize, Color, TableKit.configure({
      table: { resizable: true },
    }), ImageResize, Underline, FontFamily, Text, TextStyle,
      Highlight.configure({ multicolor: true }), 
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
      })
    ],
    content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
        
      `,

    autofocus: true,
    editable: true,
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      dispatch(setEditor(editor));
    },
    onDestroy: () => {
      dispatch(setEditor(null));
    }
  })

  return (
    <div className="flex justify-center items-start bg-dark-100 pb-[15vh]">
      <div className="w-[816px] bg-[#0B1527] text-white shadow-md rounded-md print:bg-white print:text-black">
        <EditorContent editor={editor} className="prose prose-lg focus:outline-none" />
      </div>
    </div>
  )
}

export default Editor
