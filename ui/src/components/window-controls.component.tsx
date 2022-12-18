import styled from "styled-components";
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeClose,
  VscChromeRestore,
} from "react-icons/vsc";

export const ButtonsContainer = styled.div`
  display: flex;
  min-width: 144px;
  height: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

interface WindowControlButtonProps {
  icon: React.ReactNode;
  hoverColor: string;
  activeColor?: string;
}

type HoverableDivProps = React.HTMLAttributes<HTMLDivElement> & {
  hoverColor: string;
  activeColor?: string;
};

const HoverableDiv = styled.div`
  min-width: 32px;
  min-height: 32px;
  text-align: center;
  padding-top: 0.2rem;

  &:hover {
    background-color: ${(props: HoverableDivProps) => props.hoverColor};
  }
  &:active {
    background-color: ${(props: HoverableDivProps) =>
      props.activeColor || "transparent"};
  }
`;

export const WindowControlButton = (props: WindowControlButtonProps) => {
  return (
    <>
      <HoverableDiv
        activeColor={props.activeColor}
        hoverColor={props.hoverColor}
      >
        {props.icon}
      </HoverableDiv>
    </>
  );
};

export const WindowControlBar = () => {
  return (
    <ButtonsContainer>
      <WindowControlButton
        icon={<VscChromeMinimize />}
        hoverColor="rgb(232, 229, 229)"
        activeColor="#cccccc"
      />
      <WindowControlButton
        icon={<VscChromeMaximize />}
        hoverColor="rgb(232, 229, 229)"
        activeColor="#cccccc"
      />
      <WindowControlButton
        icon={<VscChromeClose />}
        hoverColor="#ff5f5f"
        activeColor="#f09b9b"
      />
    </ButtonsContainer>
  );
};
