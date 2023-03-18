import React, {
	CSSProperties,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { stickBody } from "../utils/helpers";

export enum DialogueTypes {
	alert = "alert",
	confirm = "confirm",
	prompt = "prompt",
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

	const okBtn = useRef(null);
	const cancelBtn = useRef(null);
	const promptInput = useRef<null | HTMLInputElement>(null);

	const modalContent = useRef<null | HTMLDivElement>(null);
	const [cHeight, setcHeight] = useState<undefined | number>(undefined);

	const handleOk = useCallback(
		(e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
			// if it's not enter or ok button
			if (
				(e as KeyboardEvent).key !== "Enter" &&
				e.currentTarget !== okBtn.current
			) {
				return;
			}

			// val if prompt value is empty for type "prompt"
			if (type === DialogueTypes.prompt && promptValue === "") {
				return promptInput.current?.focus();
			}

			callbackOk(promptValue);
		},
		[callbackOk, promptValue, type]
	);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
			// if it's escape or cancel button
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
		// mount
		stickBody();
		setcHeight(modalContent.current?.clientHeight);
		document.addEventListener("keydown", handleCancel);
		document.addEventListener("keydown", handleOk);

		// unmount
		return () => {
			stickBody();
			setcHeight(undefined);
			document.removeEventListener("keydown", handleCancel);
			document.removeEventListener("keydown", handleOk);
		};
	}, [handleCancel, handleOk]);

	return (
		<div role="dialog" className="modal dark dialog">
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
					<div className="p-tb-10 p-lr-10">
						{type === DialogueTypes.prompt ? (
							<>
								<label htmlFor="promptInput">{info}</label>
								<input
									type="number"
									id="promptInput"
									className="m-t-10"
									title="Only numeral(s) are allowed"
									placeholder="Enter number of courses"
									style={{ padding: "8px" }}
									ref={promptInput}
									onInput={(e) => setPromptValue(e.currentTarget.value.trim())}
									autoFocus={true}
								/>
							</>
						) : (
							<p>{info}</p>
						)}
					</div>
					<div className="flex align-items-center justify-content-end flex-wrap m-tb-10 p-lr-10">
						{type !== DialogueTypes.alert && (
							<button
								className="m-r-10"
								type="button"
								ref={cancelBtn}
								onClick={handleCancel}
							>
								Cancel
							</button>
						)}
						<button
							type="button"
							ref={okBtn}
							onClick={handleOk}
							autoFocus={type !== DialogueTypes.prompt}
						>
							Ok
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
