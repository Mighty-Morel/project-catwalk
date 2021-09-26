/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductId } from '../../reducers/Example-Reducer';
import './card.css';
import './carousel.css';
import Modal from './Modal.jsx';
import Price from './Price.jsx';

const ProductCarousel = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [show, setShow] = useState(false);
  const [overviewName, setOverviewName] = useState('');
  const [cardName, setCardName] = useState('');
  const productId = useSelector((state) => state.product.id);
  const dispatch = useDispatch();
  const myRef = useRef(null);

  const getInfo = () => {
    axios.get(`/products/${productId}/related`) // 48432
      .then((relatedIdData) => {
        const relatedIds = relatedIdData.data; // data: [48433, 48434, 48439, 48438]
        const ids = [];
        for (let i = 0; i < relatedIds.length; i += 1) {
          const relatedId = relatedIds[i];
          ids[i] = { relatedId };
        }
        for (const id in ids) { // [{relatedId: 48433}, {relatedId: 48434}, {…}, {…}]
          if (ids[id]) {
            const { relatedId } = ids[id]; // [48433, 48434, 48439, 48438]
            axios.get(`/products/${relatedId}`)
              .then((res) => {
                for (let j = 0; j < ids.length; j += 1) {
                  if (ids[j].relatedId === res.data.id) {
                    ids[j] = { category: res.data.category, ...ids[j] };
                    ids[j] = { features: res.data.features, ...ids[j] };
                    ids[j] = { name: res.data.name, ...ids[j] };
                  }
                }
              });
            axios.get(`/products/${relatedId}/styles`)
              .then((res) => {
                for (let k = 0; k < ids.length; k += 1) {
                  if (ids[k].relatedId === Number(res.data.product_id)) {
                    ids[k] = { price: res.data.results[0].original_price, ...ids[k] };
                    ids[k] = { sale: res.data.results[0].sale_price, ...ids[k] };
                    ids[k] = {
                      pic: res.data.results[0].photos[0].thumbnail_url, ...ids[k],
                    };
                  }
                }
                setProductInfo([...ids]);
              });
          }
        }
      });
  };

  useEffect(() => { getInfo(); }, [productId]);

  const getModalInfo = (cardId) => {
    let modal;
    axios.get(`/products/${productId}`)
      .then((res) => {
        const result = [];
        const overviewNameData = res.data.name;
        const overviewFeatures = res.data.features;
        for (let l = 0; l < overviewFeatures.length; l += 1) {
          overviewFeatures[l].overview = '✓'; // true
          overviewFeatures[l].card = 'x'; // false
          result.push(overviewFeatures[l]);
        }
        modal = result;
        setOverviewName(overviewNameData);
      })
      .then(() => {
        axios.get(`/products/${cardId}`)
          .then((res) => {
            const cardNameData = res.data.name;
            const cardFeatures = res.data.features;
            for (let m = 0; m < cardFeatures.length; m += 1) {
              const cardFeature = cardFeatures[m];
              for (let n = 0; n < modal.length; n += 1) {
                const overviewFeature = modal[n].feature;
                const overviewValue = modal[n].value;
                if (overviewFeature === cardFeature.feature
                  && overviewValue === cardFeature.value) {
                  overviewFeature.card = '✓'; // true
                }
              }
              cardFeature.overview = 'x'; // false
              cardFeature.card = '✓'; // true
              modal.push(cardFeature);
            }
            setCardName(cardNameData);
            setModalInfo([...modal]);
          });
      });
  };

  const prev = () => {
    myRef.current.scrollLeft -= 230;
    if (myRef.current.scrollLeft < 230) {
      // console.log('BEGINNING OF SCROLL');
    }
  };

  const next = () => {
    myRef.current.scrollLeft += 230;
    if ((productInfo.length - 3) * 230 === myRef.current.scrollLeft) {
      // console.log('END OF SCROLL');
    }
  };

  const showModal = (cardId) => {
    getModalInfo(cardId);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const showOverview = (currentProductId) => {
    dispatch(updateProductId(currentProductId));
  };

  if (productInfo.length === 0) {
    return 'loading...';
  }
  return (
    <>
      <main>
        <Modal show={show} handleClose={hideModal} data-testid="comparison-modal">
          <div className="c-modal-title" data-testid="modal-title">Comparing</div>
          <div className="c-modal-title-wrapper">
            <div className="c-modal-overview">{overviewName}</div>
            <div className="c-modal-card">{cardName}</div>
          </div>
          {/* <ul className="c-modal-features">
            {modalInfo.map((item) => (
              <li key={item.value}>
                <div>
                  <ul>
                    {item.overview}
                    {' '}
                    {item.feature}
                    :
                    {' '}
                    {item.value}
                    {item.card}
                  </ul>
                </div>
              </li>
            ))}
          </ul> */}
          <div className="c-modal-container">
            <div className="c-modal-features-overview">
              {modalInfo.map((item) => (
                <li key={item.value}>
                  <div>
                    <ul>
                      {item.overview}
                    </ul>
                  </div>
                </li>
              ))}
            </div>

            <div className="c-modal-features">
              {modalInfo.map((item) => (
                <li key={item.value}>
                  <div>
                    <ul>
                      {item.feature}
                      :
                      {' '}
                      {item.value}
                    </ul>
                  </div>
                </li>
              ))}
            </div>

            <div className="c-modal-features-card">
              {modalInfo.map((item) => (
                <li key={item.value}>
                  <div>
                    <ul>
                      {item.card}
                    </ul>
                  </div>
                </li>
              ))}
            </div>

          </div>


        </Modal>
      </main>

      <div className="c-carousel" data-testid="product-carousel">
        <div data-testid="carousel-title">RELATED PRODUCTS</div>

        <button className="c-carousel__button c-carousel__button--left" type="button" onClick={() => prev()}>
          <img src="./images/arrow-left.png" alt="" />
        </button>

        <div className="c-carousel__track-container">

          <ul className="c-carousel__track" ref={myRef}>
            {productInfo.map((product) => (
              <li className="c-carousel__slide" key={product.relatedId}>
                <div className="c-card">
                  <div className="c-image__container">
                    <img className="c-cardImage" src={product.pic} alt="" onClick={() => showOverview(product.relatedId)} />
                    <button className="c-card__star" data-testid="open-modal" type="button" onClick={() => showModal(product.relatedId)}>
                      <img src="./images/star.png" alt="" data-testid="star" />
                    </button>
                  </div>
                  <dl className="c-cardCategory" data-testid="card-category">{product.category}</dl>
                  <dl className="c-cardTitle">{product.name}</dl>
                  <dl className="c-cardPrice"><Price price={product.price} sale={product.sale} /></dl>
                  <dl className="c-cardRating" data-testid="star-placeholder">★★★★☆</dl>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className="c-carousel__button c-carousel__button--right" type="button" onClick={() => next()}>
          <img src="./images/arrow-right.png" alt="" />
        </button>

      </div>
    </>
  );
};

export default ProductCarousel;
