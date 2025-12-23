const images = import.meta.glob('/src/img/icons/weather/*.png', { eager: true, import: 'default' });

export const getIconSource = (code, size = 1) => {
    const baseCode = code.replace('n', 'd');

    let suffix = '';
    if (size > 2) suffix = '@4x';
    else if (size > 1) suffix = '@2x';
    const path = `/src/img/icons/weather/${baseCode}_t${suffix}.png`;

    const src = images[path];

    return src;
};