import debounce from "./debounce";
import { updateProductQuantity } from "../store/cartSlice";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

const onIncrease = (
	productId,
	productPrice,
	productName,
	productImageUrl
) => {
	setProductsCount((prevCounts) => {
		const newCount = (prevCounts[productId] || 0) + 1;
		debouncedIncrease(
			productId,
			productPrice,
			productName,
			productImageUrl,
			newCount
		);
		return {
			...prevCounts,
			[productId]: newCount,
		};
	});
};

const updateIncrease = (
	productId,
	productPrice,
	productName,
	productImageUrl,
	quantity
) => {
	if (quantity >= 1) {
		dispatch(
			updateProductQuantity({
				productId,
				quantity,
				productPrice,
				productName,
				productImageUrl,
			})
		);
	}
};
const debouncedIncrease = debounce(updateIncrease, 300);

const onDecrease = (
	productId,
	productPrice,
	productName,
	productImageUrl
) => {
	setProductsCount((prevCounts) => {
		const newCount = (prevCounts[productId] || 1) - 1;
		const updatedCounts = { ...prevCounts };
		debouncedDecrease(
			productId,
			productPrice,
			productName,
			productImageUrl,
			newCount
		);
		if (newCount <= 0) {
			delete updatedCounts[productId];
		} else {
			updatedCounts[productId] = newCount;
		}
		return updatedCounts;
	});
};

const updateDecrease = (
	productId,
	productPrice,
	productName,
	productImageUrl,
	quantity
) => {
	dispatch(
		updateProductQuantity({
			productId,
			quantity,
			productPrice,
			productName,
			productImageUrl,
		})
	);
};
const debouncedDecrease = debounce(updateDecrease, 300);