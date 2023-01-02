import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Meta from '../components/Meta'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import Image from '../Share/Img/banner1.jpg'


const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  console.log(products)

  const mystyle = {
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center',
    height:'400px'
  };
  return (
    <>
      <Meta />
      {!keyword ? (

        <section className="hero pb-3 bg-cover bg-center d-flex align-items-center" style={mystyle}>
          <div className="container py-5">
            <div className="row px-4 px-lg-5">
              <div className="col-lg-6">
                <p className="text-muted small text-uppercase mb-2">New Inspiration 2022</p>
                <h1 className="h2 text-uppercase mb-3">20% off on new season- Back to school</h1><a className="btn btn-dark" href="shop.html">Browse collections</a>
              </div>
            </div>
          </div>
        </section>


      ) : (
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        )}
      <h1>Latest Products</h1>
       {
        loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>

          </>
        )
      } 

    </>
  )
}

export default HomeScreen
