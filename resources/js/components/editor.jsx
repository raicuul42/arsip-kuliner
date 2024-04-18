import MDEditor, { codeEdit, codePreview, commands } from '@uiw/react-md-editor';
import React from 'react';
import { useTheme } from '@/components/theme-provider';

export function Editor({ value, onChange }) {
    const { theme } = useTheme();
    return (
        <div>
            <MDEditor
                data-color-mode={theme === 'dark' ? 'dark' : 'light'}
                highlightEnable
                tabSize={4}
                preview="edit"
                extraCommands={[codeEdit, codePreview, commands.fullscreen]}
                visibleDragbar={false}
                height={500}
                className={
                    'mt-1 max-w-none !overflow-hidden !rounded-lg border !bg-background !shadow-sm [&>.w-md-editor-toolbar>ul>li>button>svg]:!h-3.5 [&>.w-md-editor-toolbar>ul>li>button>svg]:!w-3.5 [&>.w-md-editor-toolbar]:!h-12 [&>.w-md-editor-toolbar]:!bg-background [&>.w-md-editor-toolbar]:!px-2'
                }
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
