type Params = {
  params: {
    slug: string[];
  };
};

function ShopSlug({ params: { slug } }: Params) {
  return <div>{JSON.stringify(slug)}</div>;
}

export default ShopSlug;
