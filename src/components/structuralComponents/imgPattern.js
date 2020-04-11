import React, {useState} from 'react';
import Rodal from 'rodal';
import styles from './imgPattern.module.scss'

// include styles
import 'rodal/lib/rodal.css';

const ImgPattern = (props) => {
    const [show, setShow] = useState(false)

    const hide = () => {
        setShow(false)
    }

    const visible = () => {
        setShow(true)
    }
    return (
        <div>
          <div onClick={visible}><img className={styles.imgCard} src={props.image} alt=''/></div>
          <Rodal measure='px' width='750' height='420' className={styles.container} animation='fade' visible={show} onClose={hide}>
            <img className={styles.imgZoom} src={props.image} alt=''/>
          </Rodal>
        </div>)
}

export default ImgPattern