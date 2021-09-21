/**
 * @jest-environment jsdom
 */

// Product Info Tests ==============================================

import React from 'react';
import {
  render, cleanup, waitFor, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import ProductCarousel from '../client/src/components/Related/ProductCarousel';
import Modal from '../client/src/components/Modal/';