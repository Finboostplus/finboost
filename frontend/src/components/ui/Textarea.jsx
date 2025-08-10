import { Textarea } from '@headlessui/react';

export default function TextareaUI({
  id,
  name,
  rows,
  className,
  placeholder,
  defaultValue,
}) {
  return (
    <Textarea
      id={id}
      defaultValue={defaultValue}
      name={name}
      rows={rows}
      className={className + ' resize-none'}
      placeholder={placeholder}
    ></Textarea>
  );
}
