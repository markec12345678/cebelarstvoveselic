'use client';

import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  CreditCard,
  Banknote,
  Loader2,
  CheckCircle,
  Package,
  ArrowRight,
  ShoppingBag,
  User,
  MapPin,
  StickyNote,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useLangStore } from '@/store/language';
import { getTranslations, type TranslationStrings } from '@/lib/i18n';

const PRODUCT_IMAGES: Record<string, string> = {
  'Akacijev med': '/images/honey/acacia.jpg',
  'Lipov med': '/images/honey/linden.jpg',
  'Kostanjev med': '/images/honey/chestnut.jpg',
  'Cvetlični med': '/images/honey/wildflower.jpg',
  'Gozdni med': '/images/honey/forest.jpg',
  'Med brstov smreke': '/images/honey/fir.jpg',
  'Acacia Honey': '/images/honey/acacia.jpg',
  'Linden Honey': '/images/honey/linden.jpg',
  'Chestnut Honey': '/images/honey/chestnut.jpg',
  'Wildflower Honey': '/images/honey/wildflower.jpg',
  'Forest Honey': '/images/honey/forest.jpg',
  'Fir Honeydew Honey': '/images/honey/fir.jpg',
};

function parsePrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^0-9.,]/g, '').replace(',', '.'));
}

export default function OrderForm() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const products = t.products.items;

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [step, setStep] = useState<'products' | 'details' | 'success'>('products');
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Customer details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [payment, setPayment] = useState<'cod' | 'bank'>('cod');

  const selectedItems = useMemo(
    () =>
      products
        .map((p, i) => ({ ...p, index: i, qty: quantities[i] || 0 }))
        .filter((item) => item.qty > 0),
    [products, quantities]
  );

  const subtotal = useMemo(
    () => selectedItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0),
    [selectedItems]
  );

  const shipping = subtotal >= 35 ? 0 : 4.9;
  const total = subtotal + shipping;
  const itemCount = selectedItems.reduce((sum, item) => sum + item.qty, 0);

  const updateQuantity = (index: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[index] || 0;
      const next = Math.max(0, Math.min(20, current + delta));
      if (next === 0) {
        const { [index]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [index]: next };
    });
  };

  const formatPrice = (amount: number) =>
    lang === 'sl'
      ? `${amount.toFixed(2).replace('.', ',')} €`
      : `€${amount.toFixed(2)}`;

  const validateForm = (): boolean => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return false;
    if (!street.trim() || !city.trim() || !postalCode.trim()) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || selectedItems.length === 0) return;
    setSubmitting(true);

    try {
      const items = selectedItems.map((item) => ({
        productId: item.index,
        name: lang === 'en' ? item.nameEn : item.name,
        quantity: item.qty,
        price: parsePrice(item.price),
      }));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          street: street.trim(),
          city: city.trim(),
          postalCode: postalCode.trim(),
          notes: notes.trim(),
          paymentMethod: payment === 'cod' ? 'cash_on_delivery' : 'bank_transfer',
          items,
          subtotal,
          shippingCost: shipping,
          total,
          lang,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Order submission failed.');
      }

      setOrderNumber(data.orderNumber);
      setStep('success');
    } catch {
      // On error, stay on the details step and let user retry
      alert(lang === 'sl' ? 'Prišlo je do napake. Poskusite znova.' : 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setQuantities({});
    setStep('products');
    setFullName('');
    setEmail('');
    setPhone('');
    setStreet('');
    setCity('');
    setPostalCode('');
    setNotes('');
    setPayment('cod');
    setOrderNumber('');
  };

  const o = t.order;

  return (
    <section id="order" className="py-16 sm:py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-honey-50/50 via-background to-background dark:from-honey-950/10 dark:via-background dark:to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="px-4 py-1.5 bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 hover:bg-honey-100 text-xs font-medium mb-4">
            <ShoppingCart className="w-3 h-3 mr-1.5" />
            {o.sectionTag}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{o.title}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {o.subtitle}
          </p>
        </motion.div>

        {/* Success State */}
        <AnimatePresence mode="wait">
          {step === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto"
            >
              <Card className="border-green-200 dark:border-green-900/30">
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </motion.div>
                  {/* Honey jar celebration animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="jar-bounce text-5xl mb-3"
                  >
                    🍯
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{o.orderSuccess}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{o.orderNumber}</p>
                  <p className="text-lg font-semibold text-honey-600 dark:text-honey-400 font-mono mb-6">
                    {orderNumber}
                  </p>
                  <Separator className="my-4" />
                  <div className="text-left space-y-2 mt-4 mb-6">
                    {selectedItems.map((item) => (
                      <div key={item.index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.qty}× {lang === 'en' ? item.nameEn : item.name}
                        </span>
                        <span className="font-medium">{formatPrice(parsePrice(item.price) * item.qty)}</span>
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{o.shipping}</span>
                      <span>{shipping === 0 ? o.shippingFree : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>{o.total}</span>
                      <span className="text-honey-600 dark:text-honey-400">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Button onClick={handleReset} variant="outline" className="w-full">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    {lang === 'sl' ? 'Novo naročilo' : 'New Order'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="order"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Step indicator with animated connector */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <StepDot stepLabel={o.selectProducts} current={step === 'products' ? 0 : step === 'details' ? 1 : 2} />
                <div className="step-connector">
                  <div className="step-connector-fill" style={{ width: step === 'details' ? '100%' : '0%' }} />
                </div>
                <StepDot stepLabel={o.customerDetails} current={step === 'products' ? -1 : step === 'details' ? 0 : 1} />
              </div>

              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Products / Details column */}
                <div className="lg:col-span-2">
                  {step === 'products' ? (
                    <ProductsGrid
                      products={products}
                      quantities={quantities}
                      updateQuantity={updateQuantity}
                      formatPrice={formatPrice}
                      parsePrice={parsePrice}
                      lang={lang}
                      o={o}
                      isInView={isInView}
                    />
                  ) : (
                    <CustomerDetailsForm
                      o={o}
                      fullName={fullName}
                      setFullName={setFullName}
                      email={email}
                      setEmail={setEmail}
                      phone={phone}
                      setPhone={setPhone}
                      street={street}
                      setStreet={setStreet}
                      city={city}
                      setCity={setCity}
                      postalCode={postalCode}
                      setPostalCode={setPostalCode}
                      notes={notes}
                      setNotes={setNotes}
                      payment={payment}
                      setPayment={setPayment}
                    />
                  )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24">
                    <OrderSummaryCard
                      selectedItems={selectedItems}
                      subtotal={subtotal}
                      shipping={shipping}
                      total={total}
                      formatPrice={formatPrice}
                      parsePrice={parsePrice}
                      itemCount={itemCount}
                      o={o}
                      lang={lang}
                      step={step}
                      stepUp={() => setStep('details')}
                      handleSubmit={handleSubmit}
                      submitting={submitting}
                      stepDown={() => setStep('products')}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function StepDot({ current, stepLabel }: { current: number; stepLabel: string }) {
  const isActive = current >= 0;
  const isDone = current > 0;
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
          isActive
            ? 'bg-honey-500 text-white shadow-md shadow-honey-500/30'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {isDone ? (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          1
        )}
      </div>
      <span className="text-xs font-medium text-muted-foreground hidden sm:block">{stepLabel}</span>
    </div>
  );
}

function ProductsGrid({
  products,
  quantities,
  updateQuantity,
  formatPrice,
  parsePrice,
  lang,
  o,
  isInView,
}: {
  products: TranslationStrings['products']['items'];
  quantities: Record<number, number>;
  updateQuantity: (index: number, delta: number) => void;
  formatPrice: (amount: number) => string;
  parsePrice: (priceStr: string) => number;
  lang: 'sl' | 'en';
  o: import('@/lib/i18n').TranslationStrings['order'];
  isInView: boolean;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {products.map((product, i) => {
        const qty = quantities[i] || 0;
        const isSelected = qty > 0;
        const price = parsePrice(product.price);
        const productImage = PRODUCT_IMAGES[product.name] || PRODUCT_IMAGES[product.nameEn] || '/images/honey/wildflower.jpg';

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer group ${
                isSelected
                  ? 'border-honey-400 dark:border-honey-600 shadow-lg shadow-honey-200/40 dark:shadow-honey-900/20 ring-1 ring-honey-400/30'
                  : 'hover:border-honey-300 dark:hover:border-honey-700 hover:shadow-md'
              }`}
              onClick={() => updateQuantity(i, 1)}
            >
              <div className="flex gap-3 p-3 sm:p-4">
                {/* Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={productImage}
                    alt={lang === 'en' ? product.nameEn : product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="96px"
                  />
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-honey-500/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-6 h-6 text-white drop-shadow-lg" />
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="stock-dot" />
                    <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                      {lang === 'sl' ? 'Zaloga' : 'In Stock'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base leading-tight truncate mt-1">
                    {lang === 'en' ? product.nameEn : product.name}
                  </h3>
                  {product.badge && (
                    <Badge variant="secondary" className="mt-1 text-[10px] px-1.5 py-0 bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400">
                      {product.badge}
                    </Badge>
                  )}
                  <p className="text-sm font-bold text-honey-600 dark:text-honey-400 mt-1">
                    {formatPrice(price)}{' '}
                    <span className="text-xs font-normal text-muted-foreground">
                      / 450g
                    </span>
                  </p>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="flex items-center border rounded-lg bg-background"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => updateQuantity(i, -1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(i, 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {isSelected && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-medium text-honey-600 dark:text-honey-400"
                      >
                        = {formatPrice(price * qty)}
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

function CustomerDetailsForm({
  o,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  street,
  setStreet,
  city,
  setCity,
  postalCode,
  setPostalCode,
  notes,
  setNotes,
  payment,
  setPayment,
}: {
  o: import('@/lib/i18n').TranslationStrings['order'];
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  street: string;
  setStreet: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  postalCode: string;
  setPostalCode: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  payment: 'cod' | 'bank';
  setPayment: (v: 'cod' | 'bank') => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-honey-500" />
              {o.customerDetails}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="order-name" className="text-xs font-medium text-muted-foreground">
                  {o.fullName} *
                </label>
                <Input
                  id="order-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={o.fullNamePlaceholder}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="order-email" className="text-xs font-medium text-muted-foreground">
                  {o.emailAddress} *
                </label>
                <Input
                  id="order-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={o.emailPlaceholder}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="order-phone" className="text-xs font-medium text-muted-foreground">
                  {o.phoneNumber} *
                </label>
                <Input
                  id="order-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={o.phonePlaceholder}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Address */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-honey-500" />
              {o.deliveryAddress}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="order-street" className="text-xs font-medium text-muted-foreground">
                  {o.street} *
                </label>
                <Input
                  id="order-street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder={o.streetPlaceholder}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="order-city" className="text-xs font-medium text-muted-foreground">
                  {o.city} *
                </label>
                <Input
                  id="order-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={o.cityPlaceholder}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="order-postal" className="text-xs font-medium text-muted-foreground">
                  {o.postalCode} *
                </label>
                <Input
                  id="order-postal"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder={o.postalCodePlaceholder}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Notes */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <StickyNote className="w-4 h-4 text-honey-500" />
              {o.deliveryNotes}
            </h3>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={o.notesPlaceholder}
              rows={2}
              className="resize-none"
            />
          </div>

          <Separator />

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <CreditCard className="w-4 h-4 text-honey-500" />
              {o.paymentMethod}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPayment('cod')}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                  payment === 'cod'
                    ? 'border-honey-400 bg-honey-50 dark:bg-honey-900/10'
                    : 'border-border hover:border-honey-200 dark:hover:border-honey-800'
                }`}
              >
                <Banknote className={`w-5 h-5 ${payment === 'cod' ? 'text-honey-500' : 'text-muted-foreground'}`} />
                <div>
                  <div className="font-medium text-sm">{o.cashOnDelivery}</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPayment('bank')}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                  payment === 'bank'
                    ? 'border-honey-400 bg-honey-50 dark:bg-honey-900/10'
                    : 'border-border hover:border-honey-200 dark:hover:border-honey-800'
                }`}
              >
                <CreditCard className={`w-5 h-5 ${payment === 'bank' ? 'text-honey-500' : 'text-muted-foreground'}`} />
                <div>
                  <div className="font-medium text-sm">{o.bankTransfer}</div>
                </div>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function OrderSummaryCard({
  selectedItems,
  subtotal,
  shipping,
  total,
  formatPrice,
  parsePrice,
  itemCount,
  o,
  lang,
  step,
  stepUp,
  handleSubmit,
  submitting,
  stepDown,
}: {
  selectedItems: Array<{ index: number; qty: number; name: string; nameEn: string; price: string }>;
  subtotal: number;
  shipping: number;
  total: number;
  formatPrice: (amount: number) => string;
  parsePrice: (priceStr: string) => number;
  itemCount: number;
  o: import('@/lib/i18n').TranslationStrings['order'];
  lang: 'sl' | 'en';
  step: 'products' | 'details' | 'success';
  stepUp: () => void;
  handleSubmit: () => void;
  submitting: boolean;
  stepDown: () => void;
}) {
  return (
    <Card className="border-honey-200/60 dark:border-honey-800/30 summary-border-pulse">
      <CardContent className="p-5">
        <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 text-honey-500" />
          {o.orderSummary}
          {itemCount > 0 && (
            <Badge className="ml-auto bg-honey-500 text-white text-[10px] px-1.5">{itemCount}</Badge>
          )}
        </h3>

        {selectedItems.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">{o.minOrderNote}</p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-4">
            {selectedItems.map((item) => (
              <motion.div
                key={item.index}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-sm"
              >
                <div className="w-2 h-2 rounded-full bg-honey-400 flex-shrink-0" />
                <span className="flex-1 truncate text-muted-foreground">
                  {item.qty}× {lang === 'en' ? item.nameEn : item.name}
                </span>
                <span className="font-medium tabular-nums flex-shrink-0">
                  {formatPrice(parsePrice(item.price) * item.qty)}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        <Separator className="my-3" />

        {/* Free shipping progress */}
        {subtotal > 0 && subtotal < 35 && (
          <div className="mb-3">
            <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
              <span>{o.freeShippingThreshold}</span>
              <span>{formatPrice(35 - subtotal)}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-honey-400 to-honey-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(subtotal / 35) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{o.subtotal}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              {o.shipping}
            </span>
            <span className={shipping === 0 ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
              {shipping === 0 ? o.shippingFree : formatPrice(shipping)}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-base">
            <span>{o.total}</span>
            <span className="text-honey-600 dark:text-honey-400">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {step === 'products' ? (
            <Button
              onClick={stepUp}
              disabled={selectedItems.length === 0}
              className="w-full bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              {o.customerDetails}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <>
              {step === 'details' && (
                <Button
                  onClick={stepDown}
                  variant="ghost"
                  className="w-full text-sm"
                >
                  <ChevronRight className="w-3 h-3 mr-1 rotate-180" />
                  {o.selectProducts}
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {o.placing}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {o.placeOrder}
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
