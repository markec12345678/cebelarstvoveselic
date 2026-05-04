'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Loader2, MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';
import { toast } from 'sonner';

export default function Contact() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const MAX_MESSAGE_LENGTH = 500;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = lang === 'sl' ? 'Ime je obvezno.' : 'Name is required.';
    if (!form.email.trim()) errs.email = lang === 'sl' ? 'E-pošta je obvezna.' : 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = lang === 'sl' ? 'Neveljaven e-poštni naslov.' : 'Invalid email address.';
    if (!form.subject.trim()) errs.subject = lang === 'sl' ? 'Zadeva je obvezna.' : 'Subject is required.';
    if (!form.message.trim()) errs.message = lang === 'sl' ? 'Sporočilo je obvezno.' : 'Message is required.';
    else if (form.message.trim().length < 10)
      errs.message = lang === 'sl' ? 'Sporočilo mora vsebovati vsaj 10 znakov.' : 'Message must be at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || t.contact.error);
        return;
      }

      toast.success(t.contact.success);
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch {
      toast.error(t.contact.error);
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: t.contact.address, multiline: true },
    { icon: Phone, label: t.contact.phone, href: 'tel:+38641234567' },
    { icon: Mail, label: t.contact.email, href: 'mailto:info@cebelarstvo-veselic.si' },
    { icon: Clock, label: t.contact.hoursDetail, multiline: true },
  ];

  const socialLinks = [
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/38641234567', color: 'hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-200 dark:hover:border-green-800/30 hover:text-green-600' },
    { icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ), label: 'Facebook', href: 'https://facebook.com/cebelarstvoveselic', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200 dark:hover:border-blue-800/30 hover:text-blue-600' },
    { icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ), label: 'Instagram', href: 'https://instagram.com/cebelarstvo_veselic', color: 'hover:bg-pink-50 dark:hover:bg-pink-900/10 hover:border-pink-200 dark:hover:border-pink-800/30 hover:text-pink-600' },
  ];

  const inputFocusClass = (field: string) =>
    focusedField === field
      ? 'ring-2 ring-honey-400/20 border-honey-400 scale-[1.01] transition-all duration-200'
      : 'transition-all duration-200';

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-honey-50/50 via-background to-cream-dark/30" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {t.contact.sectionTag}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Success animation overlay */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="relative mx-auto w-20 h-20 mb-4">
                    <div className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-900/20 ring-ripple" />
                    <div className="relative w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </motion.div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-green-700 dark:text-green-400">
                    {lang === 'sl' ? 'Sporočilo poslano!' : 'Message sent!'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lang === 'sl' ? 'Odgovorili vam bomo v 24 urah.' : 'We will respond within 24 hours.'}
                  </p>
                </motion.div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t.contact.nameLabel}
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={t.contact.namePlaceholder}
                    className={`${errors.name ? 'border-destructive' : ''} ${inputFocusClass('name')}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t.contact.emailLabel}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={t.contact.emailPlaceholder}
                    className={`${errors.email ? 'border-destructive' : ''} ${inputFocusClass('email')}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">
                  {t.contact.subjectLabel}
                </Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t.contact.subjectPlaceholder}
                  className={`${errors.subject ? 'border-destructive' : ''} ${inputFocusClass('subject')}`}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-xs text-destructive" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  {t.contact.messageLabel}
                </Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                      setForm({ ...form, message: e.target.value });
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t.contact.messagePlaceholder}
                  rows={5}
                  className={`${errors.message ? 'border-destructive' : 'resize-none'} ${inputFocusClass('message')}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {/* Character count */}
                <div className="flex justify-between items-center">
                  {errors.message ? (
                    <p id="message-error" className="text-xs text-destructive" role="alert">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className={`text-xs transition-colors ${
                    form.message.length > MAX_MESSAGE_LENGTH * 0.9
                      ? 'text-amber-500'
                      : 'text-muted-foreground/50'
                  }`}>
                    {form.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-lg px-8"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.contact.submitting}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.contact.submit}
                  </>
                )}
              </Button>
            </form>

            {/* Social links */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-3">
                {lang === 'sl' ? 'Izberite način stika:' : 'Choose a way to connect:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 text-xs font-medium text-muted-foreground transition-all ${link.color}`}
                    >
                      <IconComponent />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Map - larger */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[280px] bg-muted border relative">
              <iframe
                title={t.contact.mapAlt}
                src="https://www.openstreetmap.org/export/embed.html?bbox=15.30%2C45.63%2C15.35%2C45.66&layer=mapnik&marker=45.6424%2C15.3231"
                className="w-full h-full border-0"
                loading="lazy"
                aria-label={t.contact.mapAlt}
              />
              {/* Location pin overlay */}
              <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-honey-500" />
                <span className="text-[11px] font-medium">Čebelarstvo Veselič</span>
              </div>
            </div>

            {/* Contact details with stagger animation */}
            <div className="space-y-3">
              {contactInfo.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="flex gap-3 p-3 rounded-lg bg-card border border-border/50 hover:border-honey-200 dark:hover:border-honey-800/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-honey-100 dark:bg-honey-900/20 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-honey-600 dark:text-honey-400" />
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">
                      {item.href && !item.multiline ? (
                        <a
                          href={item.href}
                          className="hover:text-honey-600 dark:hover:text-honey-400 transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        item.label
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src="/images/contact.jpg"
                alt="Artizanski kozarec medu z odtočnikom na lesenem ozadju"
                className="w-full h-[180px] object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
