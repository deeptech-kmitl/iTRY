import dynamic from 'next/dynamic';
import { useMemo } from 'react';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // Disable server-side rendering
});
import "react-quill/dist/quill.snow.css"
import { RichTextComponentProps } from './global';

export default function ITryRichText({ value, setValue, fieldName }: RichTextComponentProps) {

  const toolBarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ];



  const modules = useMemo(() => ({
    toolbar: {
      container: toolBarOptions,
    },
  }),[])

  const handleChange = (_: any, __: any, ___: any, editor: any) => {
    setValue(fieldName, editor.getHTML());
  };

  return (
    <ReactQuill theme="snow" modules={modules} value={value} onChange={handleChange} />
  );
}