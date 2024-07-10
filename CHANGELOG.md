# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.1.2](https://github.com/thewolmer/plexolyt/branches/compare/v0.1.2..v0.1.1) (2024-06-01)


### Others

* Update DropdownMenuContent width to 40 in DashboardNavLinks ([10c1e46](https://github.com/thewolmer/plexolyt/commits/10c1e46ea5580d8926d60327ad6b7f6a31e2f3b8))


### Features

* Add Change Log & categories on Home page ([5fb0cb5](https://github.com/thewolmer/plexolyt/commits/5fb0cb5cdb4c858f60e42feabfc16bee804929d5))
* Add gauge information to product details ([589e8ce](https://github.com/thewolmer/plexolyt/commits/589e8ce7dea9340e6034b82b09cde547490bdb3a))
* Add gauge to product columns and filters ([b1d7ca7](https://github.com/thewolmer/plexolyt/commits/b1d7ca71624a2238f4a1fd13c3161871c932ff56))
* Add radio selection of color, length, width and gauge on product page. Add new formSchema in products fetch action. ([a47165d](https://github.com/thewolmer/plexolyt/commits/a47165d871a956c764614baea20a847ac7beb1df))
* Add Related Products Carousel component for displaying related products ([cdd94e6](https://github.com/thewolmer/plexolyt/commits/cdd94e6701007453e4ecef5bddc698b3484424f7))
* Add subcategory to product form ([a8c1534](https://github.com/thewolmer/plexolyt/commits/a8c153424c090186e39452266bfd1a3b21ae39a6))
* Add textColor field to Category model and update Billboard component ([2ee6424](https://github.com/thewolmer/plexolyt/commits/2ee6424f91253a575d9616cc974e1cf6522f992a))
* Overall Optimization of Filters and Multiselect URL params, Add Loading state UI. ([b8bc3ae](https://github.com/thewolmer/plexolyt/commits/b8bc3ae1900854a1d3ab9edc31494eed3caef118))
* Update DashboardNavBar to include sign out functionality on Mobile ([5043879](https://github.com/thewolmer/plexolyt/commits/5043879a2ecd5352316800ced0701f9db2237f12))
* Update Database Schema to have multiple colors, lengths, widths and gauges associated with them. Add gauge entity. Update Products data table on dashboard. Update products fetch server action to work with new schema. ([b84e30c](https://github.com/thewolmer/plexolyt/commits/b84e30c3dd2f2b038b23eaa9adc55fc8ba8b6c95))
* Update GitHub token in getCommits function ([de7aa08](https://github.com/thewolmer/plexolyt/commits/de7aa087282d732251bfe94af5e0d43b7f80eeb9))


### Bug Fixes

* dashboard and commit data is now fetched on server side, changed auth token to environment variable ([e7058d7](https://github.com/thewolmer/plexolyt/commits/e7058d71454ba7f33446103223824581bee4a3db))
* Dashboard cache issue, Add separate actions for client - Replace CreatedAt with UpdatedAt Relative date - Add flex-wrap wherever needed. ([b42c9e2](https://github.com/thewolmer/plexolyt/commits/b42c9e2b8ca7d1b54b9a88714a8b0627e4aa1a24))
* Rename the variable `searchParams.subCategory` to `searchParams.type` for improved clarity and consistency with the naming convention used in the codebase. ([cd4aaac](https://github.com/thewolmer/plexolyt/commits/cd4aaace110cfb38629a1ca365fb7713a3848d01))


### Code Refactoring

* Add `unstable_cache` caching on Server and Client requests ([85abc06](https://github.com/thewolmer/plexolyt/commits/85abc06ee6f3572a04609eec516cc7db8c9fc071))
* Add client queries to route handles in api. - Add cache ([f1fab93](https://github.com/thewolmer/plexolyt/commits/f1fab93b71dfe0fa3ad6862a7a26716b62194cbb))
* revalidateTag ([cfca1b5](https://github.com/thewolmer/plexolyt/commits/cfca1b55cb7af2265c9b2e19221f6fba822862b2))
* Update baseUrl to use NEXT_PUBLIC_APP_URL ([145018d](https://github.com/thewolmer/plexolyt/commits/145018d61c57cca3fd474d63493acb28156cb258))
* Update CardHeader styling for responsive layout ([1f6b3dd](https://github.com/thewolmer/plexolyt/commits/1f6b3dd033e165a70dbbda46bfd9387305c3f3fa))
* Update Cart component to remove item by object instead of ID ([d0454fb](https://github.com/thewolmer/plexolyt/commits/d0454fb95816160b8ac0243063ecd95fde0ec9f9))
* Update data properties to be optional in response interfaces ([c7b436e](https://github.com/thewolmer/plexolyt/commits/c7b436e9136a6e5f6b23f1fe8486e0c7d7d660f8))
* Update page content and component names for PVC Insulated Wire and Cable ([2aa741a](https://github.com/thewolmer/plexolyt/commits/2aa741ac2ec9e2f7c496719b3dbd1c255e93e0ef))
* Update StoreNavBar link to "/for-wholesalers" ([560f685](https://github.com/thewolmer/plexolyt/commits/560f6854a6c759ceb162e3ac25c235f1b2da67c1))
* Update token with NEXT_PUBLIC ([daa0eaf](https://github.com/thewolmer/plexolyt/commits/daa0eafa6e366d2e1fcc61fc5bcf09e399fe6069))

## 0.1.1 (2024-05-28)


### Others

* Update .gitignore to include admins.ts ([b89f0b5](https://github.com/thewolmer/plexolyt/commits/b89f0b5347c3092fad2c1d8296d68781e495a19d))
* Update checkout page layout for mobile view and better organization ([9df139c](https://github.com/thewolmer/plexolyt/commits/9df139c5c04cce2ab1f5d55c36a48d29f916c099))
* Update npm dependencies to include @radix-ui/react-checkbox and @radix-ui/react-navigation-menu ([3fadce1](https://github.com/thewolmer/plexolyt/commits/3fadce1517a5e0d5a9af1ddd89982229c0d4152c))
* Update project configuration files ([1173067](https://github.com/thewolmer/plexolyt/commits/11730678f95b0c04558708bcc31b628192ab45a6))


### Features

* Add 'CONFIRMED' status to order upon payment ([391a12d](https://github.com/thewolmer/plexolyt/commits/391a12dd6f497a36a125a292390a774e8933df1f))
* Add Filtering ([02424c9](https://github.com/thewolmer/plexolyt/commits/02424c99f2c3cfa9abf6ac5960f10ea0c9299f1e))
* Add form validation schemas for color, billboard, category, length, and width ([5de1577](https://github.com/thewolmer/plexolyt/commits/5de1577731364c8c0bd5fbd3aab2ecd497848bff))
* Add lazy loading for images, update npm dependencies ([8e865af](https://github.com/thewolmer/plexolyt/commits/8e865af469c040fd3be950f548881e4f53f87293))
* Add lazy loading for images, update npm dependencies ([1b339dd](https://github.com/thewolmer/plexolyt/commits/1b339dd4da16ebe50ad4a02e46e1f806a6eca25d))
* Add new icons to the Icons component ([e9d3a45](https://github.com/thewolmer/plexolyt/commits/e9d3a457d03bfecdc850866c995b0768e02f29b0))
* Add new pages for colors, widths, lengths, and products ([6aa33b8](https://github.com/thewolmer/plexolyt/commits/6aa33b8748141ce63a24d060b6ed3a0549b08344))
* Add new pages for colors, widths, lengths, and products ([150984e](https://github.com/thewolmer/plexolyt/commits/150984e518a370de9e8467a3dbfbf3d76be88a0c))
* Add next-nprogress-bar and swr npm dependencies ([b214c8d](https://github.com/thewolmer/plexolyt/commits/b214c8dfba38e7a7cb2a441e647ecb37d5c4a3ab))
* Add Slugify utility function and StoreLayout component ([84d7c7b](https://github.com/thewolmer/plexolyt/commits/84d7c7ba537018fe0cdd6c4ab5a151040507680e))
* Adds products page and logic, Add formatter utility for currency formatting ([0432f79](https://github.com/thewolmer/plexolyt/commits/0432f794e4d6a3074dcc9d28258c1cf7823aa985))
* **categoryies:** adds categories, refactors code, adds relavidation ([8ec5625](https://github.com/thewolmer/plexolyt/commits/8ec56259b6cea779cfa6c7ff3f62de2a7986ab77))
* Emails on order placed ([8bb2c13](https://github.com/thewolmer/plexolyt/commits/8bb2c137199c8352c9078d53214b3da65ffc1d99))
* Improve page product and lazy loading for images ([c721383](https://github.com/thewolmer/plexolyt/commits/c721383e50f43d7bc45eb6fc1a2164d5d31bac54))
* minor fixes and adds header ([ffb72e5](https://github.com/thewolmer/plexolyt/commits/ffb72e54d3465b1aac5606edd944a2e192b6ae1a))
* Refresh router after form submission in BillboardForm and CategoryForm components ([08cfa77](https://github.com/thewolmer/plexolyt/commits/08cfa779e48308254e5bc2b45d8ba77ae8a30bdb))
* Remove disabled attribute from form fields ([dd0a193](https://github.com/thewolmer/plexolyt/commits/dd0a193f3fb2db220ae7e062a6397ba181b2c3bb))
* **sheet:** adds autoclose to sheet on mobile ([04a3bfe](https://github.com/thewolmer/plexolyt/commits/04a3bfe1baae1798463191ef3f0bc5d252b21b31))
* Update manufacturer name to use 'Aluminum' instead of 'Aluminium' ([7466c29](https://github.com/thewolmer/plexolyt/commits/7466c294e1a02135c32156a578985ae04d469176))


### Bug Fixes

* **add postinstall script:** adds postinstall script to generate prisma schema ([e59abab](https://github.com/thewolmer/plexolyt/commits/e59abab05d2e8e717524bec3409a000ae5e68861))
* makes dashboard dynamic ([6cc3342](https://github.com/thewolmer/plexolyt/commits/6cc3342cfd7cb8e0664d04b3ced9eab04c5ceb92))
* removes force-dynamic from billboards ([784fcf6](https://github.com/thewolmer/plexolyt/commits/784fcf6018e313fbd841f8f7a9e2ff5f98e3cf9d))
* revalidation fixes ([5b75ebc](https://github.com/thewolmer/plexolyt/commits/5b75ebcb96fbaa47fdfd7c5cf17d802d7d408dca))
* tries to fix revalidation ([9eeae8e](https://github.com/thewolmer/plexolyt/commits/9eeae8e7fadd0145882d30f090ed4315a508afa4))


### Code Refactoring

* better organize files, mobile view fix ([500c2b5](https://github.com/thewolmer/plexolyt/commits/500c2b5133fa24d3ca38c2e4529628575285b7e4))
* dashboard in root ([cf0e6f3](https://github.com/thewolmer/plexolyt/commits/cf0e6f3e99cd937a4f3656a74b64eca1408750e5))
* remove unused revalidate variable in categories.ts ([a921714](https://github.com/thewolmer/plexolyt/commits/a92171484bca4e0117d5e0c770ead0230197b610))
