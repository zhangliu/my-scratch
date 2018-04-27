import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import videojs from 'video.js';

import styles from './index.css';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isOpen: true} // props.showPlayBox }
    }

    componentDidMount() {
        if (this.player) return this.player.play()
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
                src: 'http://www.codingmarch.com/statics/video/trylesson.mp4',
                type: 'video/mp4'
            }]
        }
        this.player = videojs(this.videoNode, videoJsOptions, () => {
            const children = this.player.children()
            const video = children.find(c => !!c.currentSrc);
            video.className = video.className
                ? `${video.className} ${styles.mqVideo}`
                : styles.mqVideo
        });
    }

    componentWillReceiveProps(props) {
        if (props.isOpen) this.player.play()
        this.setState({isOpen: props.isOpen})
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    show() {
        this.setState({isOpen: true});
    }

    hide() {
        this.player.pause();
        this.isPlay = false;
        this.setState({isOpen: false});
    }

    render() {
        const isOpen = this.state.isOpen
        return (
            <div className={isOpen ? styles.mqModalOverlay : styles.mqModalOverlayHidden}>
                <div className={styles.mqModalContent}>
                    <div className={styles.modalClose} onClick={() => this.hide()}>X</div>
                    <div data-vjs-player>
                        <video
                            className={styles.mqVideoJs}
                            ref={node => this.videoNode = this.videoNode || node}
                        />
                    </div>
                </div>
            </div>
        )
    }
    // render() {
    //     return (<ReactModal
    //         isOpen={this.state.isOpen}
    //         className={styles.mqModalContent}
    //         contentLabel=''
    //         overlayClassName={styles.mqModalOverlay}
    //         onRequestClose={() => this.hide()}
    //         onAfterOpen={this.onOpenModal.bind(this)}
    //     >
    //         <Box className={styles.mqPlayBoxBody}>
    //             <div data-vjs-player>
    //                 <video
    //                     className={styles.mqVideoJs}
    //                     ref={node => this.videoNode = this.videoNode || node}
    //                 />
    //             </div>
    //         </Box>
    //     </ReactModal>)
    // }
}

// MyComponent.propTypes = {
//     onCancel: PropTypes.func.isRequired,
//     onTryIt: PropTypes.func.isRequired
// };

// export default MyComponent;
