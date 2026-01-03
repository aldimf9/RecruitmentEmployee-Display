import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button aria-label="Increment Value"
                    onClick={() => dispatch(incrementByAmount(2))}>
                    Increment By Amount
                </button>
                <button aria-label="Increment Value"
                    onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span>{count}</span>
                <button aria-label="Decrement Value"
                    onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
        </div>
    )
}