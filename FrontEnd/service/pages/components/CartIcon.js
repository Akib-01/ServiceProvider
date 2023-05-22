const CartIcon = ({ cartCount }) => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 4h-1V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 1.99 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 16h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4V9h-4v2h4zm-6-4h8V4H4v2zM2 6H0v16c0 1.1.9 2 2 2h14v-2H2V6z"
        />
      </svg>
      <span className="cart-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
