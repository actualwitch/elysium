let i = 0;
const color = () => { 
    return {
        type: 'color',
        id: i++,
}
}

export const brand = color();