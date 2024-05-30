"use client"

import { FC, useEffect, useState } from "react"

import styles from "./form.module.scss"
import { ITextEditor } from "./interface/form.interface"
import { ContentState, EditorState, convertToRaw } from "draft-js"
import htmlToDraft from "html-to-draftjs"
import draftToHtml from "draftjs-to-html"
import cn from "classnames"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const TextEditor: FC<ITextEditor> = ({
  onChange,
  placeholder,
  value,
  error,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isUpdated, setIsUpdated] = useState(false)

  const defaultValue = value || ""

  useEffect(() => {
    if (isUpdated) return

    const blocksForHtml = htmlToDraft(defaultValue)

    const contentState = ContentState.createFromBlockArray(
      blocksForHtml.contentBlocks,
      blocksForHtml.entityMap
    )

    const newEditorState = EditorState.createWithContent(contentState)

    setEditorState(newEditorState)
  }, [value, isUpdated])

  const onEditorStateChange = (editorState: EditorState) => {
    setIsUpdated(true)
    setEditorState(editorState)

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className={cn(styles.common, styles.editorWrapper, "animate-fade")}>
      <label htmlFor="">
        <span>{placeholder}</span>

        <div className={styles.wrapper}>
          <Editor
            toolbarClassName={styles.toolbar}
            editorClassName={styles.editor}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            spellCheck
            toolbar={{
              options: ["inline", "list"],
              inline: {
                inDropDown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["bold", "italic", "underline", "strikethrough"],
              },
              list: {
                inDropDown: false,
                options: ["unordered", "ordered"],
              },
            }}
          />
        </div>

        {error ? <div className={styles.error}>{error.message}</div> : null}
      </label>
    </div>
  )
}

export default TextEditor
