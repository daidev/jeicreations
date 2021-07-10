import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, darken } from '@material-ui/core/styles';
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import useCategories from '../hooks/useCategories';
import useProductsList from '../hooks/useProductsList';
import useProductsByCategory from '../hooks/useProductsByCategory';
import CardStack, { Variant } from './CardStack';
import Curvedcontainer from './CurvedContainer';
import ProductFilters from './ProductFilters';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  rainbowText: {
    backgroundImage: 'linear-gradient(#EDBCDD, #F2CEAE)',
    backgroundSize: '100%',
    backgroundRepeat: 'repeat',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitTextStrokeColor: '#000000',
    WebkitTextStrokeWidth: '1px',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  productCard: {
    width: '300px',
  }
}));

const INITIAL_FILTERS = {
  category: '',
  colors: '',
  materials: '',
};

const colors = [
  {
    name: 'Rosa',
    description: ''
  },
  {
    name: 'Bianco',
    description: '',
  },
  {
    name: 'Blue',
    description: '',
  }
];

const materials = [
  {
    name: 'Feltro',
    description: '',
  },
  {
    name: 'Cotone',
    description: '',
  },
  {
    name: 'Pile',
    description: '',
  }
];

const ProductCard = ({ img, title, color }) => {
  const css = useStyles();
  return (
    <Box m={2}>
      <CardStack
        color={darken(color, 0.2)}
        variant={Variant.FAN_LEFT}
        classNames={css.productCard}
        density={30}
      >
        {/* <Image src={img} height={150} width={300} /> */}
        <Box p={0} marginTop={2}>
          <Typography
            variant="overline"
            align="center"
            display="block"
          >
            {title}
          </Typography>
        </Box>
      </CardStack>
    </Box>
  )
}

const CategoryProducts = ({ color, name, products, index }) => {
  // const variant = (index % 2 == 0) ? 'up' : 'down';
  const variant = (index == 0) ? 'up' : 'down';
  return (
    <Curvedcontainer color={color} title={name} variant={variant}>
      <Grid container justify="center">
        {products.map(({ title, images }) => (
          <Grid item md={3} key={title}>
            <ProductCard img={images[0]} title={title} color={color} />
          </Grid>
        ))}
      </Grid>
    </Curvedcontainer>
  )
}

export default function ProductList({ filters }) {
  const css = useStyles();
  console.log({ filters });
  const { pathname, push } = useRouter();
  const [selectedFilters, setSelectedFilters] = useState(filters || INITIAL_FILTERS);
  const { loading, products: productsByCategories } = useProductsByCategory(selectedFilters);
  const { categories, loading: loadingCategories, getCategory } = useCategories(); 
  
  console.log('PPP', productsByCategories);

  const handleUpdateFilters = (filterType, value) => {
    const filterValues = selectedFilters[filterType].split(',');
    const index = filterValues.indexOf(value);
    index >= 0 ? filterValues.splice(index, 1) : filterValues.push(value);

    const newFilters = {
      ...selectedFilters,
      [filterType]: filterValues.join(','),
    };

    setSelectedFilters(newFilters);
    const query = new URLSearchParams(newFilters);
    push({ pathname, query: query.toString() }, undefined, { shallow: true });
  }

  const resetFilters = () => {
    setSelectedFilters(INITIAL_FILTERS);
    push({ pathname, query: "" }, undefined, { shallow: true });
  }

  return (
    <Box textAlign="center" paddingY={4}>
      <Typography variant="h1" className={css.rainbowText}>
        Products
      </Typography>

      <ProductFilters
        dataSource={{ categories, colors, materials }}
        updateFilters={handleUpdateFilters}
        selectedFilters={selectedFilters}
        resetFilters={resetFilters}
      />

      {loading || loadingCategories ? (
        <Loading message="Geeting some fresh products ready for you" />
      ) : Object.entries(productsByCategories).map(([category, products], index) => (
        <CategoryProducts
          {...getCategory(category)}
          key={category}
          products={products}
          index={index}
        />
      ))}
    </Box>
  )
}
