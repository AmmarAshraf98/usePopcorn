export function Button({ onOpen, isOpen }) {
  return (
    <button className='btn-toggle' onClick={() => onOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
