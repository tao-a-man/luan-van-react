import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    disabled = false,
    rounded,
    primary = false,
    outline = false,
    text = false,
    small = false,
    lager = false,
    textThin = false,
    iconLeft,
    iconRight,
    className,
    children,
    onClick,
    ...otherProps
}) {
    let Comp = 'button';

    const classes = cx('wrapper', {
        disabled,
        rounded,
        primary,
        outline,
        text,
        small,
        lager,
        textThin,
        [className]: className,
    });

    const props = {
        onClick,
        ...otherProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    return (
        <Comp className={classes} {...props}>
            {iconLeft && <span className={cx('icon')}>{iconLeft}</span>}
            <span className={cx('title')}>{children}</span>
            {iconRight && <span className={cx('icon')}>{iconRight}</span>}
        </Comp>
    );
}

export default Button;
