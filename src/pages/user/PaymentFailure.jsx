import { Link } from "react-router-dom";

const PaymentFailure = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-gray-900 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed ❌</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Oops! Something went wrong during your payment. Please try again.
      </p>
      <Link
        to="/cart"
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Go back to Cart
      </Link>
    </div>
  );
};

export default PaymentFailure;
