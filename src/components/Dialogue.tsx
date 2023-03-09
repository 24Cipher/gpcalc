import React, {
	CSSProperties,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { stickBody } from "../utils/helpers";

export enum DialogueTypes {
	alert,
	confirm,
	prompt,
}

interface DialogueProps {
	info: string;
	type: DialogueTypes;
	callbackOk: Function;
	callbackCancel?: () => void;
}

export default function Dialogue({
	info,
	type,
	callbackOk,
	callbackCancel,
}: DialogueProps) {
	const [promptValue, setPromptValue] = useState("");
	const cancelBtn = useRef(null);
	const okBtn = useRef(null);
	const modalContent = useRef<null | HTMLDivElement>(null);
	const [cHeight, setcHeight] = useState<undefined | number>(undefined);

	const handleOk = (e: React.FormEvent) => {
		e.preventDefault();
		callbackOk(promptValue);
	};

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
			if (
				callbackCancel &&
				((e as KeyboardEvent).key === "Escape" ||
					e.currentTarget === cancelBtn.current)
			) {
				callbackCancel();
			}
		},
		[callbackCancel]
	);

	useEffect(() => {
		stickBody();
		setcHeight(modalContent.current?.clientHeight);
		document.addEventListener("keydown", handleCancel);
		return () => {
			stickBody();
			setcHeight(undefined);
			document.removeEventListener("keydown", handleCancel);
		};
	}, [handleCancel]);

	return (
		<div role="dialog" className="modal dark">
			<div
				className="modal-content"
				ref={modalContent}
				style={
					cHeight && cHeight > 130
						? ({ "--c-height": cHeight + "px" } as CSSProperties)
						: undefined
				}
			>
				<div className="modal-body p-10">
					<form onSubmit={handleOk}>
						<div className="p-tb-10 p-lr-10">
							<div>{info}</div>
							{type === DialogueTypes.prompt && (
								<input
									type="number"
									className="m-t-10 p-5"
									title="Only numeral(s) are allowed"
									placeholder="Enter number of courses"
									onInput={(e) => setPromptValue(e.currentTarget.value.trim())}
									autoFocus={true}
									required
								/>
							)}
						</div>
						<div className="flex align-items-center justify-content-end flex-wrap m-tb-10 p-lr-10">
							{type !== DialogueTypes.alert && (
								<button
									className="m-r-10"
									type="button"
									ref={cancelBtn}
									onClick={(e) => handleCancel(e)}
								>
									Cancel
								</button>
							)}
							<button
								type="submit"
								ref={okBtn}
								autoFocus={type !== DialogueTypes.prompt}
							>
								Ok
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
