import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.module.css';
import LinkComponent from '../../UI/Link/Link';
import { withRouter } from 'react-router-dom';
import { faWrench, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
const SideDrawer = props => {
    return (
        <Aux>
            <div className={classes.Container}>
                <div className={classes.Content}>
                    <ul>
                        {props.linka ? <LinkComponent link={props.patha} icon={props.icona}> {props.linka}</LinkComponent> : null}
                        {props.linkb ? <LinkComponent link={props.pathb} icon={props.iconb}> {props.linkb}</LinkComponent> : null}
                        {props.linkc ? <LinkComponent link={props.pathc} icon={props.iconc}> {props.linkc}</LinkComponent> : null}
                        {props.linkd ? <LinkComponent link={props.pathd} icon={props.icond}> {props.linkd}</LinkComponent> : null}
                        {props.linke ? <LinkComponent link={props.pathe} icon={props.icone}> {props.linke}</LinkComponent> : null}
                        {props.linkf ? <LinkComponent link={props.pathf} icon={props.iconf}> {props.linkf}</LinkComponent> : null}
                    </ul>
                </div>
                <div className={classes.Contentb}>
                    <p></p>
                    <ul>
                        <LinkComponent link="/Log-out" clicked={()=>props.signOut()} icon={faDoorOpen} >Log Out</LinkComponent>
                        <LinkComponent link="/Dashboard/Chat" icon={faTelegram} >Chat</LinkComponent>
                        <LinkComponent link="/Dashboard/Settings" icon={faWrench} >Settings</LinkComponent>
                    </ul>
                </div>
            </div>
        </Aux>
    )
};
export default withRouter(SideDrawer);