import * as React from 'react';
import { useRef } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

interface ContextTransitionValues {
	parent: {
		appear?: boolean;
		isInitialRender?: boolean;
		show?: boolean;
	};
}

const TransitionContext = React.createContext<ContextTransitionValues>({
	parent: {},
});

function useIsInitialRender() {
	const isInitialRender = React.useRef(true);
	React.useEffect(() => {
		isInitialRender.current = false;
	}, []);
	return isInitialRender.current;
}

interface ICSSTransitionProps {
	show: boolean;
	enter?: string;
	enterStart?: string;
	enterEnd?: string;
	leave?: string;
	leaveStart?: string;
	leaveEnd?: string;
	appear?: boolean;
	unmountOnExit?: boolean;
	tag?: React.ComponentType | keyof JSX.IntrinsicElements;
	children?: React.ReactNode;
	className?: string;
}

const CSSTransition: React.FC<ICSSTransitionProps> = props => {
	const {
		show,
		enter = '',
		enterStart = '',
		enterEnd = '',
		leave = '',
		leaveStart = '',
		leaveEnd = '',
		appear,
		unmountOnExit,
		tag = 'div',
		...rest
	} = props;

	const enterClasses = enter.split(' ').filter(s => s.length);
	const enterStartClasses = enterStart.split(' ').filter(s => s.length);
	const enterEndClasses = enterEnd.split(' ').filter(s => s.length);
	const leaveClasses = leave.split(' ').filter(s => s.length);
	const leaveStartClasses = leaveStart.split(' ').filter(s => s.length);
	const leaveEndClasses = leaveEnd.split(' ').filter(s => s.length);
	const removeFromDom = unmountOnExit;

	function addClasses(node, classes) {
		classes.length && node.classList.add(...classes);
	}

	function removeClasses(node, classes) {
		classes.length && node.classList.remove(...classes);
	}

	const nodeRef = useRef<HTMLElement>(null);
	const Component = tag;

	return (
		<ReactCSSTransition
			appear={appear}
			nodeRef={nodeRef}
			unmountOnExit={removeFromDom}
			in={show}
			addEndListener={done => {
				nodeRef.current.addEventListener('transitionend', done, false);
			}}
			onEnter={() => {
				if (!removeFromDom) nodeRef.current.style.display = null;
				addClasses(nodeRef.current, [
					...enterClasses,
					...enterStartClasses,
				]);
			}}
			onEntering={() => {
				removeClasses(nodeRef.current, enterStartClasses);
				addClasses(nodeRef.current, enterEndClasses);
			}}
			onEntered={() => {
				removeClasses(nodeRef.current, [
					...enterEndClasses,
					...enterClasses,
				]);
			}}
			onExit={() => {
				addClasses(nodeRef.current, [
					...leaveClasses,
					...leaveStartClasses,
				]);
			}}
			onExiting={() => {
				removeClasses(nodeRef.current, leaveStartClasses);
				addClasses(nodeRef.current, leaveEndClasses);
			}}
			onExited={() => {
				removeClasses(nodeRef.current, [
					...leaveEndClasses,
					...leaveClasses,
				]);
				if (!removeFromDom) nodeRef.current.style.display = 'none';
			}}
		>
			{/* @ts-ignore-start */}
			<Component
				//@ts-ignore
				ref={nodeRef}
				style={{ display: !removeFromDom ? 'none' : null }}
				className={props.className}
			>
				{props.children}
			</Component>
			{/* @ts-ignore-end */}
		</ReactCSSTransition>
	);
};

interface TransitionProps extends ICSSTransitionProps {
	show: boolean;
	appear: boolean;
}
export function Transition({ show, appear, ...rest }: TransitionProps) {
	const { parent } = React.useContext(TransitionContext);
	const isInitialRender = useIsInitialRender();
	const isChild = show === undefined;

	if (isChild) {
		return (
			<CSSTransition
				appear={parent.appear || !parent.isInitialRender}
				show={parent.show}
				{...rest}
			/>
		);
	}

	return (
		<TransitionContext.Provider
			value={{
				parent: {
					show,
					isInitialRender,
					appear,
				},
			}}
		>
			<CSSTransition appear={appear} show={show} {...rest} />
		</TransitionContext.Provider>
	);
}
