'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react';
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(t.contact.success);
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
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
                    placeholder={t.contact.namePlaceholder}
                    className={errors.name ? 'border-destructive' : ''}
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
                    placeholder={t.contact.emailPlaceholder}
                    className={errors.email ? 'border-destructive' : ''}
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
                  placeholder={t.contact.subjectPlaceholder}
                  className={errors.subject ? 'border-destructive' : ''}
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
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  rows={5}
                  className={errors.message ? 'border-destructive' : 'resize-none'}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-destructive" role="alert">
                    {errors.message}
                  </p>
                )}
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
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[200px] bg-muted flex items-center justify-center border">
              <iframe
                title={t.contact.mapAlt}
                src="https://www.openstreetmap.org/export/embed.html?bbox=15.3%2C45.63%2C15.35%2C45.66&layer=mapnik&marker=45.6424%2C15.3231"
                className="w-full h-full border-0"
                loading="lazy"
                aria-label={t.contact.mapAlt}
              />
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-lg bg-card border border-border/50"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-honey-100 dark:bg-honey-900/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-honey-600 dark:text-honey-400" />
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
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/contact.jpg"
                alt="Artizanski kozarec medu z odtočnikom na lesenem ozadju"
                className="w-full h-[180px] object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
