import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function StandardImageList() {
    return (
        <ImageList sx={{ width: 1000, height: 700 }} cols={3} rowHeight={100}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Krispy_Kreme_Cannington%2C_April_2022.jpg/330px-Krispy_Kreme_Cannington%2C_April_2022.jpg',
        title: 'Coffee',
    },
];