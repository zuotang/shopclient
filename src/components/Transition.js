import React from "react";
import { TransitionGroup, Transition as ReactTransition } from "react-transition-group";

// The duration for each phase of the transition
// So the total duration will be _twice_ this
const timeout = 200;

const styles = {
  entering: {
    position: "absolute",
    opacity: 0,
    transform: "translateY(100px)",
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out,transform ${timeout}ms ease-in-out`,
    opacity: 1,
    transform: "translateY(0px)",
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out,transform ${timeout}ms ease-in-out`,
    opacity: 0,
    transform: "translateY(100px)",
  },
};
let pPathName = "";
const Transition = ({ children, history, location }) => {
  //记录上次动画的key，如果页面非替换则播放动画
  if (history.action != "REPLACE") {
    pPathName = location.pathname;
  }
  return (
    <TransitionGroup>
      <ReactTransition key={history.action == "REPLACE" ? pPathName : location.pathname} timeout={timeout}>
        {(status) => <div style={styles[status]}>{children}</div>}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default Transition;
