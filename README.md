# Tamsirat Aleiz React Version

এই প্রজেক্টটি `aleiz.com/index` ফাইল থেকে React.js/Vite প্রজেক্টে আলাদা আলাদা component, hook, util, data এবং CSS ফাইলে রূপান্তর করা হয়েছে।

## চালানোর নিয়ম

প্রথমে পুরনো/ভুল install ফাইল থাকলে মুছে দিন:

```bash
rd /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force
```

তারপর install করুন:

```bash
npm install
npm run dev
```

Production build করতে:

```bash
npm run build
npm run preview
```

## Windows PowerShell বিকল্প

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
npm run dev
```

## ফাইল স্ট্রাকচার

```text
src/
  components/      # UI components
  data/            # Demo product data
  hooks/           # Fetch/cart hooks
  i18n/            # Arabic/English translations
  styles/          # Global CSS copied from original design
  utils/           # Product/image/status helper functions
```

## নোট

- এই ZIP থেকে `package-lock.json` সরানো হয়েছে যাতে install করার সময় আপনার কম্পিউটারে public npm registry থেকে fresh dependency আসে।
- `.npmrc` ফাইলে `registry=https://registry.npmjs.org/` দেওয়া আছে, যাতে ভুল/internal registry ব্যবহার না হয়।
- Font Awesome এবং Google Fonts `index.html` থেকে CDN দিয়ে লোড হচ্ছে।
- Product data আগে Google Apps Script API থেকে fetch করার চেষ্টা করে; সমস্যা হলে demo data দেখাবে।
- Product slider ও hero slider-এর জন্য Swiper ব্যবহার করা হয়েছে।
"# tamsirat-react" 
