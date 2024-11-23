import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
  const params = useParams()
  const productId = params.id
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [discountedPrice, setDiscountedPrice] = useState(0)

  const [image, setImage] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [excerptImage, setExcerptImage] = useState('')
  const [excerptPart, setExcerptPart] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [uploading, setUploading] = useState(false)
  const [catalog, setCatalog] = useState('')
  const [weight, setWeight] = useState('')
  const [related, setRelated] = useState('')
  const [related2, setRelated2] = useState('')
  const [related3, setRelated3] = useState('')
  const [tags, setTags] = useState('')
  const [language, setLanguage] = useState('')
  const [binding, setBinding] = useState('')
  const [pages, setPages] = useState('')
  const [isbn, setIsbn] = useState('')
  const [year, setYear] = useState('')

  /* All Products Dropdown content*/
  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setDiscount(product.discount)
        setDiscountedPrice(product.discountedPrice)
        setImage(product.image)
        setAuthor(product.author)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        setExcerptImage(product.excerpt.image)
        setExcerptPart(product.excerpt.part)
        setExcerpt(product.excerpt.excerpt)
        setCatalog(product.catalog)
        setWeight(product.weight)
        setRelated(product.related)
        setRelated2(product.related2)
        setRelated3(product.related3)
        setTags(product.tags)
        setLanguage(product.language)
        setBinding(product.binding)
        setPages(product.pages)
        setIsbn(product.isbn)
        setYear(product.year)
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate, products])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('upload', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      if (data.includes('ukazka')) {
        setExcerptImage(data)
      } else {
        setImage(data)
      }

      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const excerptObject = {
    image: excerptImage,
    part: excerptPart,
    excerpt: excerpt,
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        discount,
        discountedPrice,
        image,
        author,
        category,
        description,
        excerpt: excerptObject,
        countInStock,
        catalog,
        weight,
        related,
        related2,
        related3,
        tags,
        language,
        binding,
        pages,
        isbn,
        year,
      })
    )
    // document.location.href = `/admin/product/${productId}/edit`
  }

  const relatedHandler = (productName, productId) => {
    let relatedProd = {
      name: productName,
      id: productId,
    }
    setRelated(relatedProd)
  }

  const relatedHandler2 = (productName, productId) => {
    let relatedProd = {
      name: productName,
      id: productId,
    }
    setRelated2(relatedProd)
  }

  const relatedHandler3 = (productName, productId) => {
    let relatedProd = {
      name: productName,
      id: productId,
    }
    setRelated3(relatedProd)
  }

  const discountHandler = (discount) => {
    setDiscount(discount)
    const newPrice = price - (price * discount) / 100
    const roundedPriceToFiveCents = Math.ceil(newPrice * 20) / 20
    setDiscountedPrice(roundedPriceToFiveCents)
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-back my-3'>
        Zpět
      </Link>
      <FormContainer>
        <h1>Produkt</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='product-name'>
              <Form.Label>
                Název <sup>*</sup>
              </Form.Label>
              <Form.Control
                type='name'
                required
                placeholder='Název'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>
                Cena <sup>*</sup> (ve formátu např: 5.8 bez měny)
              </Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Cena'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='discount'>
              <Form.Label>Sleva (ve formátu např: 30 bez %)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Sleva'
                value={discount}
                onChange={(e) => discountHandler(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='discounted-price'>
              <Form.Label>
                Cena po slevě (automatický výpočet a zaokrouhlení na 5 centů)
              </Form.Label>
              <Form.Control
                type='number'
                placeholder='Cena po slevě'
                value={discountedPrice}
                readOnly
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='mb-3'>
              <Form.Label>Obrázek (274 x 379 pixelů)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Obrázek'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='author'>
              <Form.Label>
                Autor <sup>*</sup>
              </Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Autor'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Počet na skladě</Form.Label>
              <Form.Control
                type='number'
                placeholder='Počet na skladě'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='year'>
              <Form.Label>Rok vydání</Form.Label>
              <Form.Control
                type='text'
                placeholder='Rok vydání'
                value={year}
                onChange={(e) => setYear(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>
                Kategorie (aby se produkt zobrazil v záložce E-shop ve své
                kategorii)
              </Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='related-dropdown rounded'
                >
                  Kategorie
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    value={'Boží ekonomie'}
                    onClick={() => setCategory('Boží-ekonomie')}
                  >
                    Boží ekonomie
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'brožury'}
                    onClick={() => setCategory('brožury')}
                  >
                    Brožury
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'církev'}
                    onClick={() => setCategory('církev')}
                  >
                    Církev
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'duch'}
                    onClick={() => setCategory('duch')}
                  >
                    Duch
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'evangelium'}
                    onClick={() => setCategory('evangelium')}
                  >
                    Evangelium
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'křesťanská-praxe'}
                    onClick={() => setCategory('křesťanská-praxe')}
                  >
                    Křesťanská praxe
                  </Dropdown.Item>

                  <Dropdown.Item
                    value={'křesťanská-služba'}
                    onClick={() => setCategory('křesťanská-služba')}
                  >
                    Křesťanská služba
                  </Dropdown.Item>

                  <Dropdown.Item
                    value={'kristus'}
                    onClick={() => setCategory('kristus')}
                  >
                    Kristus
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'letáky'}
                    onClick={() => setCategory('letáky')}
                  >
                    Letáky
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'mládež'}
                    onClick={() => setCategory('mládež')}
                  >
                    Mládež
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'studium-a-výklad-bible'}
                    onClick={() => setCategory('studium-a-výklad-bible')}
                  >
                    Studium a výklad Bible
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'Trojjediný-Bůh'}
                    onClick={() => setCategory('Trojjediný-Bůh')}
                  >
                    Trojjediný Bůh
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'život'}
                    onClick={() => setCategory('život')}
                  >
                    Život
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={'životopisné'}
                    onClick={() => setCategory('životopisné')}
                  >
                    Životopisné
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Control
                type='text'
                placeholder='Kategorie'
                value={category}
                readOnly
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='catalog'>
              <Form.Label>Katalog</Form.Label>
              <Form.Control
                type='text'
                placeholder='Katalog'
                value={catalog}
                onChange={(e) => setCatalog(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='weight'>
              <Form.Label>Hmotnost bez kg, např. 0.33</Form.Label>
              <Form.Control
                type='text'
                placeholder='Hmotnost'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='related'>
              <Form.Label className='my-3'>
                Související tituly (max 3)
              </Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='related-dropdown rounded'
                >
                  Související titul č.1
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {products.map((product) => {
                    return (
                      <Dropdown.Item
                        key={product._id}
                        value={product.name}
                        onClick={() =>
                          relatedHandler(product.name, product._id)
                        }
                      >
                        {product.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                type='text'
                placeholder='Titul'
                value={related.name}
                onChange={(e) => setRelated(e.target.value)}
              ></Form.Control>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='related-dropdown rounded'
                >
                  Související titul č.2
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {products.map((product) => {
                    return (
                      <Dropdown.Item
                        key={product._id}
                        value={product.name}
                        onClick={() =>
                          relatedHandler2(product.name, product._id)
                        }
                      >
                        {product.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                type='text'
                placeholder='Titul2'
                value={related2.name}
                onChange={(e) => setRelated2(e.target.value)}
              ></Form.Control>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='related-dropdown rounded'
                >
                  Související titul č.3
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {products.map((product) => {
                    return (
                      <Dropdown.Item
                        key={product._id}
                        value={product.name}
                        onClick={() =>
                          relatedHandler3(product.name, product._id)
                        }
                      >
                        {product.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                type='text'
                placeholder='Titul3'
                value={related3.name}
                onChange={(e) => setRelated3(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='tags'>
              <Form.Label>Tagy</Form.Label>
              <Form.Control
                type='text'
                placeholder='Tagy'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='language'>
              <Form.Label>Jazyk</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant='success'
                  id='dropdown-basic'
                  className='language-dropdown'
                >
                  Jazyk
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    key='SK'
                    value='SK'
                    onClick={() => setLanguage('SK')}
                  >
                    <h5 className='language-dropdown-lang'>SK</h5>
                  </Dropdown.Item>
                  <Dropdown.Item
                    key='CZ'
                    value='CZ'
                    onClick={() => setLanguage('CZ')}
                  >
                    <h5 className='language-dropdown-lang'>CZ</h5>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Control
                type='text'
                placeholder='Jazyk'
                value={language}
                readOnly
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='binding'>
              <Form.Label>Vazba</Form.Label>
              <Form.Control
                type='text'
                placeholder='Vazba'
                value={binding}
                onChange={(e) => setBinding(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='pages'>
              <Form.Label>Počet stran</Form.Label>
              <Form.Control
                type='text'
                placeholder='Počet stran'
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isbn'>
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type='text'
                placeholder='ISBN'
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Popis</Form.Label>
              <Form.Control
                as='textarea'
                rows={15}
                type='textarea'
                placeholder='Popis'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='excerpt-image' className='my-3'>
              <Form.Label>
                Ukázka - Obrázek (názov súboru musí obsahovat "ukazka", napr.
                dvaja_duchovia_ukazka.png, 250 x 250 pixelů )
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Ukázka - Obrázek'
                value={excerptImage}
                onChange={(e) => setExcerptImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='excerpt-part' className='my-3'>
              <Form.Label>Ukázka - část (zobrazí se v čítárně)</Form.Label>
              <Form.Control
                as='textarea'
                rows={15}
                type='textarea'
                placeholder='Ukázka-část'
                value={excerptPart}
                onChange={(e) => setExcerptPart(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='excerpt'>
              <Form.Label>Ukázka (Rozklik na Přečíst si víc)</Form.Label>
              <Form.Control
                as='textarea'
                rows={15}
                type='textarea'
                placeholder='Ukázka'
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              className='my-5 btn-blue rounded'
              type='submit'
              variant='primary'
            >
              Uložit
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
