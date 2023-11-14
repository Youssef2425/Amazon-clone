import { clearFavorites } from "@/Redux-Toolkit/slices/cartSlice";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'


const ClearFavorite = () => {
  const dispatch = useDispatch();

  const clearTheFavorites = () => {
    Swal.fire({
      title: `Are you sure
      you want to clear the favorites ?`,
      showCancelButton: true,
      showCloseButton: true,
    }).then((data) => {
      data.isConfirmed && dispatch(clearFavorites())
    })
  }
  return (
    <button
      onClick={clearTheFavorites}
      className="w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300"
    >
      Clear All
    </button>
  );
};

export default ClearFavorite;