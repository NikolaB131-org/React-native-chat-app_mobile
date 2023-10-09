export function getMessageIfExists(obj: unknown): string {
  if (obj instanceof Object && Object.hasOwn(obj, 'message')) {
    return (obj as { message: string }).message;
  }
  return '';
}
