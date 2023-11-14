import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { clearCart } from '../Redux-Toolkit/slices/cartSlice';

export default function ClearCart() {

  const dispatch = useDispatch();
  const clearTheCart = () => {
    Swal.fire({
      title: `Are you sure
      you want to clear your cart ?`,
      showCancelButton: true,
      showCloseButton: true,
    }).then((data) => {
      data.isConfirmed && dispatch(clearCart())
    })
  }
  return (
    <button onClick={clearTheCart}
    className="w-44 h-10 font-semibold bg-gray-200 hover:bg-red-600 rounded-lg
    hover:text-white duration-300">
      Clear Cart
    </button>
  )
}
