import React, {useEffect, useState} from "react"
//hooks
import useClickOutside from "hooks/useClickOutside";
//styles
import gsap from "gsap";
import styled from "styled-components";
import {BurgerButton, BurgerLine} from "./style";
//components
import {Transition} from "react-transition-group";

const ChildrenWrapper = styled.div`
    display: inline-block;
    position: absolute;
    transform: translateX(-100%);
    top: 0;
    left: 0;
`;

const SideBar = (Component, props) => {
    const {children, onComplete, ...rest} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [ComponentIsMounted, setComponentIsMounted] = useState(false);

    //detect click outside
    const [childrenRef] = useClickOutside(() => setIsOpen(false));
    
    return (
        <>
            <BurgerButton 
                disabled={isOpen}
                onClick={() => setIsOpen(true)} 
                {...rest}
            >
                <BurgerLine />
                <BurgerLine />
                <BurgerLine />
            </BurgerButton>

            <Transition
                timeout={1000}
                in={isOpen}
                unmountOnExit
                mountOnEnter
                addEndListener={(node, done) => 
                    gsap.to(node, {
                        x: isOpen ? 0 : "-100%",
                        ease: "expo.out",
                        onComplete: () => {
                            done();
                            setComponentIsMounted(prev => !prev);
                        },
                        duration: 0.5
                    })
                }>
                
                <ChildrenWrapper ref={childrenRef}>
                    <Component 
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        isMounted={ComponentIsMounted}
                        {...rest}
                    />
                </ChildrenWrapper>
            </Transition> 
        </>
    )
}


export default SideBar;