const COVER_PAGE_ALL_ELEMENTS = '<section style="width:595px;height:842px;padding:40px 20px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;align-items:center;font-family:\'Open Sans\',-apple-system,BlinkMacSystemFont,sans-serif;"><section><div style="margin:0 auto;width:120px;height:120px;background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url(\'Mock Issuer Logo\');"></div><h2 style="margin:30px 0 20px">mock certificate title</h2></section><section style="text-align:center"><div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;">Issue Date</dt><dd style="margin:0;word-break:break-all">00-00-0000 00:00:00</dd></div><div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;">Recipient</dt><dd style="margin:0;word-break:break-all">Mock Recipient Name</dd></div><div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;">Issuer</dt><dd style="margin:0;word-break:break-all">Mock Issuer Name</dd></div><div style="margin:15px 0"><dt style="margin-bottom:5px;text-transform:uppercase;font-weight:600;">Issuer\'s Public Key</dt><dd style="margin:0;word-break:break-all">Mock Issuer Public Key</dd></div></section><section><span style="margin-bottom:15px;font-size:12px">Scan the QR code to verify the document.</span><div style="margin:0 auto;width:120px;height:120px;background-repeat:no-repeat;background-position:center;background-size:contain;background-image:url(\'data:image/svg+xml;base64,Mock QR Code Image\');"></div></section><section><div style="width:150px"><a href="https://www.blockcerts.org" style="color:#031532;text-decoration:none"><svg class="buv-qa-logo--branded buv-c-logo--medium" viewBox="0 0 686 163"><g fill="none" fill-rule="evenodd"><g transform="translate(-76 -70)"><g transform="translate(76 53)"><path d="m119.52 35.613h21.191c9.8308 0 16.935 1.4323 21.313 4.2969 4.3783 2.8646 6.5674 7.3893 6.5674 13.574 0 4.1667-1.0742 7.6334-3.2227 10.4-2.1484 2.7669-5.2409 4.5085-9.2773 5.2246v0.48828c5.013 0.94402 8.6995 2.8076 11.06 5.5908 2.36 2.7832 3.54 6.5511 3.54 11.304 0 6.4128-2.2379 11.434-6.7139 15.063-4.4759 3.6296-10.701 5.4443-18.677 5.4443h-25.781v-71.387zm11.67 29.492h11.23c4.8828 0 8.4473-0.7731 10.693-2.3193s3.3691-4.1748 3.3691-7.8857c0-3.3529-1.2126-5.778-3.6377-7.2754-2.4251-1.4974-6.2744-2.2461-11.548-2.2461h-10.107v19.727zm0 9.4727v22.607h12.402c4.8828 0 8.5693-0.93586 11.06-2.8076 2.4902-1.8718 3.7354-4.8258 3.7354-8.8623 0-3.711-1.2695-6.4616-3.8086-8.252-2.5391-1.7904-6.3965-2.6855-11.572-2.6855h-11.816zm51.346 32.422v-71.387h11.67v61.377h30.225v10.01h-41.895zm112.58-35.791c0 11.621-2.9052 20.654-8.7158 27.1-5.8106 6.4453-14.038 9.668-24.683 9.668-10.775 0-19.051-3.1982-24.829-9.5947-5.778-6.3965-8.667-15.487-8.667-27.271s2.9052-20.833 8.7158-27.148c5.8106-6.3151 14.103-9.4727 24.878-9.4727 10.612 0 18.815 3.2063 24.609 9.6191s8.6914 15.446 8.6914 27.1zm-54.492 0c0 8.7891 1.7741 15.454 5.3223 19.995 3.5482 4.541 8.8053 6.8115 15.771 6.8115 6.9336 0 12.166-2.2461 15.698-6.7383 3.5319-4.4922 5.2979-11.182 5.2979-20.068 0-8.7566-1.7497-15.397-5.249-19.922-3.4994-4.5248-8.7158-6.7871-15.649-6.7871-6.9987 0-12.28 2.2623-15.845 6.7871s-5.3467 11.165-5.3467 19.922zm97.195-26.611c-6.7058 0-11.979 2.3763-15.82 7.1289-3.8412 4.7526-5.7617 11.312-5.7617 19.678 0 8.7566 1.8473 15.381 5.542 19.873 3.6947 4.4922 9.0413 6.7383 16.04 6.7383 3.0274 0 5.957-0.3011 8.7891-0.90332 2.832-0.60222 5.778-1.3753 8.8379-2.3193v10.01c-5.599 2.1159-11.947 3.1738-19.043 3.1738-10.449 0-18.473-3.1657-24.072-9.4971-5.599-6.3314-8.3984-15.389-8.3984-27.173 0-7.4219 1.359-13.916 4.0771-19.482 2.7181-5.5664 6.6487-9.8307 11.792-12.793s11.182-4.4434 18.115-4.4434c7.2917 0 14.03 1.5299 20.215 4.5898l-4.1992 9.7168c-2.4089-1.1393-4.956-2.1403-7.6416-3.0029-2.6856-0.86263-5.5094-1.2939-8.4717-1.2939zm84.5 62.402h-13.525l-22.412-32.324-6.8848 5.6152v26.709h-11.67v-71.387h11.67v34.082c3.1901-3.9063 6.3639-7.666 9.5215-11.279l19.287-22.803h13.281c-12.468 14.649-21.403 25.081-26.807 31.299l27.539 40.088zm37.576-67.92c-8.9519 0-15.999 2.8646-21.143 8.5938s-7.7148 13.574-7.7148 23.535c0 10.189 2.4251 18.099 7.2754 23.73 4.8503 5.6315 11.784 8.4473 20.801 8.4473 5.9896 0 11.491-0.76497 16.504-2.2949v4.3945c-4.7201 1.6602-10.612 2.4902-17.676 2.4902-10.026 0-17.92-3.2389-23.682-9.7168-5.7617-6.4779-8.6426-15.527-8.6426-27.148 0-7.2592 1.3753-13.656 4.126-19.189 2.7507-5.5339 6.7057-9.8063 11.865-12.817s11.157-4.5166 17.993-4.5166c6.9662 0 13.2 1.3021 18.701 3.9062l-2.002 4.4922c-5.2084-2.6042-10.677-3.9062-16.406-3.9062zm67.654 67.92h-39.014v-71.387h39.014v4.5898h-34.033v27.002h32.129v4.5898h-32.129v30.615h34.033v4.5898zm18.143-31.104v31.104h-4.9805v-71.387h16.992c8.8542 0 15.397 1.6357 19.629 4.9072s6.3477 8.195 6.3477 14.771c0 4.7852-1.2614 8.8216-3.7842 12.109-2.5228 3.2878-6.3558 5.6478-11.499 7.0801l19.385 32.52h-5.957l-18.408-31.104h-17.725zm0-4.2969h13.623c6.0222 0 10.693-1.3428 14.014-4.0283s4.9805-6.6487 4.9805-11.89c0-5.4362-1.6276-9.3913-4.8828-11.865-3.2552-2.474-8.5612-3.7109-15.918-3.7109h-11.816v31.494zm70.047 35.4h-5.0293v-66.699h-23.193v-4.6875h51.416v4.6875h-23.193v66.699zm70.193-18.408c0 5.9571-2.1891 10.677-6.5674 14.16-4.3783 3.4831-10.197 5.2246-17.456 5.2246-8.724 0-15.413-0.96028-20.068-2.8809v-4.9805c5.1433 2.181 11.702 3.2715 19.678 3.2715 5.8594 0 10.506-1.3428 13.94-4.0283 3.4343-2.6856 5.1514-6.2093 5.1514-10.571 0-2.7018-0.56966-4.9398-1.709-6.7139-1.1393-1.7741-2.9948-3.3935-5.5664-4.8584-2.5716-1.4649-6.3476-3.0436-11.328-4.7363-7.2917-2.5065-12.329-5.2165-15.112-8.1299s-4.1748-6.7952-4.1748-11.646c0-5.3386 2.0914-9.6924 6.2744-13.062 4.183-3.3692 9.5621-5.0537 16.138-5.0537 6.7058 0 13.005 1.2695 18.896 3.8086l-1.8066 4.2969c-5.9245-2.474-11.589-3.7109-16.992-3.7109-5.2735 0-9.4726 1.2207-12.598 3.6621-3.125 2.4414-4.6875 5.7617-4.6875 9.9609 0 2.6367 0.48014 4.8014 1.4404 6.4941 0.96029 1.6927 2.5309 3.2145 4.7119 4.5654 2.181 1.3509 5.9245 2.9704 11.23 4.8584 5.5664 1.9206 9.7493 3.7842 12.549 5.5908 2.7995 1.8066 4.8421 3.8574 6.1279 6.1523 1.2858 2.2949 1.9287 5.07 1.9287 8.3252z" fill="#182650" fill-rule="nonzero"></path><rect transform="translate(33.5 82) rotate(90) translate(-33.5 -82)" x="28.5" y="48.5" width="10" height="67" rx="5" fill="#2AB27B"></rect><rect transform="translate(82 82) rotate(90) translate(-82 -82)" x="77" y="77" width="10" height="10" rx="5" fill="#2AB27B"></rect><rect transform="translate(53 102) rotate(90) translate(-53 -102)" x="48" y="97" width="10" height="10" rx="5" fill="#2AB27B"></rect><rect transform="translate(82 42) rotate(90) translate(-82 -42)" x="77" y="37" width="10" height="10" rx="5" fill="#2AB27B"></rect><rect transform="translate(5 42) rotate(90) translate(-5 -42)" y="37" width="10" height="10" rx="5" fill="#2AB27B"></rect><rect transform="translate(44 22) rotate(90) translate(-44 -22)" x="39" y="17" width="10" height="10" rx="5" fill="#2AB27B"></rect><rect transform="translate(34 62) rotate(90) translate(-34 -62)" x="29" y="57" width="10" height="10" rx="5" fill="#2AB27B"></rect><rect transform="translate(73 22) rotate(90) translate(-73 -22)" x="68" y="8" width="10" height="28" rx="5" fill="#2AB27B"></rect><rect transform="translate(14.5 22) rotate(90) translate(-14.5 -22)" x="9.5" y="7.5" width="10" height="29" rx="5" fill="#2AB27B"></rect><rect transform="translate(68 62) rotate(90) translate(-68 -62)" x="63" y="43" width="10" height="38" rx="5" fill="#2AB27B"></rect><rect transform="translate(9.5 62) rotate(90) translate(-9.5 -62)" x="4.5" y="52.5" width="10" height="19" rx="5" fill="#2AB27B"></rect><rect transform="translate(77.5 102) rotate(90) translate(-77.5 -102)" x="72.5" y="92.5" width="10" height="19" rx="5" fill="#2AB27B"></rect><rect transform="translate(19 102) rotate(90) translate(-19 -102)" x="14" y="83" width="10" height="38" rx="5" fill="#2AB27B"></rect><rect transform="translate(43.5 42) rotate(90) translate(-43.5 -42)" x="38.5" y="18.5" width="10" height="47" rx="5" fill="#2AB27B"></rect><path d="m10.013 172h-2.6147v-20.164h-7.1213v-2.3225h16.857v2.3225h-7.1213v20.164zm21.656 0v-10.905c0-1.374-0.31274-2.3994-0.93823-3.0762s-1.6047-1.0151-2.9377-1.0151c-1.7739 0-3.0685 0.48193-3.8837 1.4458s-1.2228 2.543-1.2228 4.7373v8.8132h-2.5532v-23.933h2.5532v7.2444c0 0.87159-0.041015 1.5945-0.12305 2.1687h0.15381c0.50244-0.81006 1.2176-1.4484 2.1456-1.9149 0.92798-0.46656 1.9867-0.69983 3.1761-0.69983 2.061 0 3.6068 0.48962 4.6373 1.4689 1.0305 0.97925 1.5458 2.5353 1.5458 4.6681v10.997h-2.5532zm14.919 0.30762c-2.4917 0-4.4579-0.75878-5.8986-2.2764-1.4407-1.5176-2.161-3.6247-2.161-6.3215 0-2.7173 0.66906-4.8757 2.0072-6.4753 1.3381-1.5996 3.1351-2.3994 5.391-2.3994 2.1123 0 3.7837 0.6947 5.0142 2.0841 1.2305 1.3894 1.8457 3.2223 1.8457 5.4987v1.615h-11.613c0.05127 1.979 0.55114 3.4812 1.4996 4.5066 0.94849 1.0254 2.284 1.5381 4.0067 1.5381 1.815 0 3.6094-0.37939 5.3833-1.1382v2.2764c-0.90235 0.38965-1.756 0.66907-2.5609 0.83826s-1.7765 0.25378-2.9147 0.25378zm-0.69214-15.335c-1.3535 0-2.4327 0.44091-3.2377 1.3228-0.80494 0.88184-1.2792 2.102-1.4227 3.6606h8.8132c0-1.6099-0.35888-2.8429-1.0767-3.6991-0.71778-0.8562-1.7432-1.2843-3.0762-1.2843zm39.329 3.7529c0 3.5991-0.91003 6.4292-2.7301 8.4902-1.8201 2.061-4.3502 3.0916-7.5905 3.0916-3.312 0-5.8678-1.0126-7.6674-3.0377-1.7996-2.0252-2.6993-4.8834-2.6993-8.5748 0-3.6607 0.90233-6.4984 2.707-8.5133 1.8047-2.0149 4.3681-3.0223 7.6904-3.0223 3.23 0 5.7524 1.0254 7.5674 3.0762 1.815 2.0508 2.7224 4.8808 2.7224 8.4902zm-17.919 0c0 3.0454 0.64855 5.3551 1.9457 6.9291 1.2971 1.574 3.1813 2.361 5.6525 2.361 2.4917 0 4.3733-0.78442 5.6448-2.3533 1.2715-1.5689 1.9072-3.8811 1.9072-6.9368 0-3.0249-0.63317-5.3192-1.8995-6.8829-1.2664-1.5637-3.1402-2.3456-5.6217-2.3456-2.4917 0-4.3861 0.78698-5.6832 2.361-1.2971 1.574-1.9457 3.8631-1.9457 6.8676zm30.393 11.582c-1.0972 0-2.0995-0.20251-3.007-0.60754-0.90748-0.40503-1.6688-1.028-2.2841-1.8688h-0.18457c0.12305 0.98438 0.18457 1.9175 0.18457 2.7993v6.9368h-2.5532v-24.425h2.0764l0.35376 2.3071h0.12305c0.65625-0.92286 1.4202-1.5894 2.2917-1.9995 0.87159-0.41016 1.8713-0.61523 2.9993-0.61523 2.2354 0 3.9606 0.76391 5.1757 2.2917s1.8226 3.6709 1.8226 6.4292c0 2.7686-0.61779 4.9193-1.8534 6.4523-1.2356 1.533-2.9506 2.2994-5.1449 2.2994zm-0.36914-15.304c-1.7227 0-2.9685 0.4768-3.7375 1.4304s-1.1638 2.4712-1.1843 4.5527v0.56909c0 2.3687 0.39477 4.0631 1.1843 5.0834s2.0559 1.5304 3.7991 1.5304c1.4561 0 2.5968-0.58959 3.4222-1.7688 0.82544-1.1792 1.2382-2.8044 1.2382-4.8757 0-2.1021-0.41272-3.7145-1.2382-4.8373-0.82544-1.1228-1.9867-1.6842-3.4838-1.6842zm18.949 15.304c-2.4917 0-4.4579-0.75878-5.8986-2.2764s-2.161-3.6247-2.161-6.3215c0-2.7173 0.66906-4.8757 2.0072-6.4753 1.3381-1.5996 3.1351-2.3994 5.391-2.3994 2.1123 0 3.7837 0.6947 5.0142 2.0841 1.2305 1.3894 1.8457 3.2223 1.8457 5.4987v1.615h-11.613c0.05127 1.979 0.55114 3.4812 1.4996 4.5066 0.94849 1.0254 2.284 1.5381 4.0067 1.5381 1.815 0 3.6094-0.37939 5.3833-1.1382v2.2764c-0.90235 0.38965-1.756 0.66907-2.5609 0.83826-0.80494 0.16919-1.7765 0.25378-2.9147 0.25378zm-0.69214-15.335c-1.3535 0-2.4327 0.44091-3.2377 1.3228-0.80494 0.88184-1.2792 2.102-1.4227 3.6606h8.8132c0-1.6099-0.35888-2.8429-1.0767-3.6991-0.71778-0.8562-1.7432-1.2843-3.0762-1.2843zm22.779 15.027v-10.905c0-1.374-0.31274-2.3994-0.93823-3.0762-0.62549-0.67676-1.6047-1.0151-2.9377-1.0151-1.7637 0-3.0557 0.4768-3.876 1.4304-0.82032 0.95362-1.2305 2.5276-1.2305 4.7219v8.844h-2.5532v-16.857h2.0764l0.41528 2.3071h0.12305c0.52295-0.83057 1.2561-1.474 2.1995-1.9303s1.9944-0.68445 3.1531-0.68445c2.0303 0 3.5581 0.48962 4.5835 1.4689 1.0254 0.97925 1.5381 2.5455 1.5381 4.6989v10.997h-2.5532zm29.054-5.9832c0 1.979-0.71777 3.5222-2.1533 4.6296-1.4356 1.1074-3.3838 1.6611-5.8447 1.6611-2.666 0-4.7168-0.3435-6.1523-1.0305v-2.5225c0.92286 0.38965 1.9277 0.69726 3.0146 0.92285 1.0869 0.22559 2.1636 0.33838 3.23 0.33838 1.7432 0 3.0557-0.33068 3.9375-0.99206 0.88184-0.66138 1.3228-1.5817 1.3228-2.7609 0-0.7793-0.15637-1.4176-0.46912-1.9149-0.31274-0.49732-0.83569-0.95617-1.5688-1.3766-0.73316-0.42041-1.8483-0.89722-3.3453-1.4304-2.0918-0.74854-3.5863-1.6355-4.4835-2.6609s-1.3458-2.3635-1.3458-4.0144c0-1.7329 0.65112-3.1121 1.9534-4.1375 1.3023-1.0254 3.0249-1.5381 5.168-1.5381 2.2354 0 4.2912 0.41015 6.1677 1.2305l-0.81518 2.2764c-1.856-0.7793-3.6606-1.1689-5.4141-1.1689-1.3843 0-2.4661 0.29736-3.2454 0.89209s-1.1689 1.4202-1.1689 2.4763c0 0.7793 0.14355 1.4176 0.43066 1.9149s0.7716 0.95361 1.4535 1.3689 1.7252 0.87414 3.13 1.3766c2.3584 0.84082 3.9811 1.7432 4.868 2.707s1.3304 2.2148 1.3304 3.7529zm9.6592 4.1836c0.45117 0 0.88696-0.033324 1.3074-0.099975s0.75366-0.13586 0.99976-0.20764v1.9534c-0.27686 0.1333-0.68445 0.24353-1.2228 0.33069-0.53833 0.087159-1.0228 0.13074-1.4535 0.13074-3.2608 0-4.8911-1.7175-4.8911-5.1526v-10.028h-2.4148v-1.2305l2.4148-1.0613 1.0767-3.5991h1.4766v3.9067h4.8911v1.9841h-4.8911v9.9207c0 1.0151 0.24096 1.7944 0.7229 2.3379s1.1433 0.81518 1.9841 0.81518zm16.042 1.7996l-0.50757-2.3994h-0.12305c-0.84082 1.0562-1.6791 1.7714-2.5148 2.1456-0.8357 0.37427-1.879 0.5614-3.13 0.5614-1.6714 0-2.9813-0.43066-3.9298-1.292s-1.4227-2.0867-1.4227-3.676c0-3.4043 2.7224-5.1885 8.1672-5.3525l2.8608-0.092286v-1.0459c0-1.3228-0.28454-2.2994-0.85364-2.9301-0.5691-0.63062-1.4791-0.94592-2.7301-0.94592-1.4048 0-2.9941 0.43066-4.7681 1.292l-0.78442-1.9534c0.83057-0.45117 1.7406-0.80493 2.7301-1.0613s1.9816-0.38452 2.9762-0.38452c2.0098 0 3.4991 0.44604 4.4681 1.3381 0.969 0.8921 1.4535 2.3225 1.4535 4.2913v11.505h-1.8918zm-5.7678-1.7996c1.5894 0 2.8378-0.43579 3.7452-1.3074 0.90748-0.87159 1.3612-2.0918 1.3612-3.6606v-1.5227l-2.5532 0.10767c-2.0303 0.071778-3.494 0.38708-4.3912 0.94592-0.89722 0.55884-1.3458 1.4278-1.3458 2.6071 0 0.92286 0.27942 1.6252 0.83826 2.1072s1.3407 0.7229 2.3456 0.7229zm24.456 1.7996v-10.905c0-1.374-0.31274-2.3994-0.93823-3.0762s-1.6047-1.0151-2.9377-1.0151c-1.7637 0-3.0557 0.4768-3.876 1.4304-0.82032 0.95362-1.2305 2.5276-1.2305 4.7219v8.844h-2.5532v-16.857h2.0764l0.41528 2.3071h0.12305c0.52295-0.83057 1.2561-1.474 2.1995-1.9303s1.9944-0.68445 3.1531-0.68445c2.0303 0 3.5581 0.48962 4.5835 1.4689s1.5381 2.5455 1.5381 4.6989v10.997h-2.5532zm19.272-2.261h-0.13843c-1.1792 1.7124-2.9429 2.5686-5.291 2.5686-2.2046 0-3.9196-0.75365-5.1449-2.261-1.2253-1.5073-1.838-3.6504-1.838-6.4292 0-2.7788 0.61523-4.9372 1.8457-6.4753 1.2305-1.5381 2.9429-2.3071 5.1372-2.3071 2.2866 0 4.04 0.83056 5.2603 2.4917h0.19995l-0.10767-1.2151-0.061523-1.1843v-6.8599h2.5532v23.933h-2.0764l-0.33838-2.261zm-5.1064 0.43066c1.7432 0 3.007-0.47424 3.7914-1.4227s1.1766-2.4789 1.1766-4.5912v-0.53833c0-2.3892-0.39734-4.0939-1.192-5.1141s-2.0636-1.5304-3.8068-1.5304c-1.4971 0-2.6429 0.5819-3.4376 1.7457s-1.192 2.807-1.192 4.9296c0 2.1533 0.39477 3.7786 1.1843 4.8757 0.78955 1.0972 1.9482 1.6458 3.4761 1.6458zm23.302 1.8303l-0.50757-2.3994h-0.12305c-0.84082 1.0562-1.6791 1.7714-2.5148 2.1456-0.8357 0.37427-1.879 0.5614-3.13 0.5614-1.6714 0-2.9813-0.43066-3.9298-1.292s-1.4227-2.0867-1.4227-3.676c0-3.4043 2.7224-5.1885 8.1672-5.3525l2.8608-0.092286v-1.0459c0-1.3228-0.28454-2.2994-0.85364-2.9301-0.5691-0.63062-1.4791-0.94592-2.7301-0.94592-1.4048 0-2.9941 0.43066-4.7681 1.292l-0.78442-1.9534c0.83057-0.45117 1.7406-0.80493 2.7301-1.0613 0.98951-0.25635 1.9816-0.38452 2.9762-0.38452 2.0098 0 3.4991 0.44604 4.4681 1.3381 0.969 0.8921 1.4535 2.3225 1.4535 4.2913v11.505h-1.8918zm-5.7678-1.7996c1.5894 0 2.8378-0.43579 3.7452-1.3074 0.90748-0.87159 1.3612-2.0918 1.3612-3.6606v-1.5227l-2.5532 0.10767c-2.0303 0.071778-3.494 0.38708-4.3912 0.94592-0.89722 0.55884-1.3458 1.4278-1.3458 2.6071 0 0.92286 0.27942 1.6252 0.83826 2.1072 0.55884 0.48194 1.3407 0.7229 2.3456 0.7229zm20.61-15.365c0.74854 0 1.4202 0.061523 2.0149 0.18457l-0.35376 2.3687c-0.69727-0.15381-1.3125-0.23071-1.8457-0.23071-1.3638 0-2.5301 0.5537-3.4991 1.6611-0.969 1.1074-1.4535 2.4866-1.4535 4.1375v9.0439h-2.5532v-16.857h2.1072l0.29224 3.1223h0.12305c0.62549-1.0972 1.3791-1.9431 2.261-2.5378 0.88184-0.59473 1.8508-0.89209 2.907-0.89209zm16.011 14.904h-0.13843c-1.1792 1.7124-2.9429 2.5686-5.291 2.5686-2.2046 0-3.9195-0.75365-5.1449-2.261s-1.838-3.6504-1.838-6.4292c0-2.7788 0.61523-4.9372 1.8457-6.4753 1.2305-1.5381 2.9429-2.3071 5.1372-2.3071 2.2866 0 4.04 0.83056 5.2603 2.4917h0.19995l-0.10767-1.2151-0.061524-1.1843v-6.8599h2.5532v23.933h-2.0764l-0.33838-2.261zm-5.1064 0.43066c1.7432 0 3.007-0.47424 3.7914-1.4227 0.78443-0.94849 1.1766-2.4789 1.1766-4.5912v-0.53833c0-2.3892-0.39734-4.0939-1.192-5.1141-0.79468-1.0203-2.0636-1.5304-3.8068-1.5304-1.4971 0-2.6429 0.5819-3.4376 1.7457-0.79468 1.1638-1.192 2.807-1.192 4.9296 0 2.1533 0.39477 3.7786 1.1843 4.8757 0.78956 1.0972 1.9482 1.6458 3.4761 1.6458zm24.117 1.8303h-2.6147v-22.487h12.535v2.3225h-9.9207v8.2288h9.3208v2.3225h-9.3208v9.613zm27.809-8.4441c0 2.7481-0.69213 4.8937-2.0764 6.4369-1.3843 1.5432-3.2966 2.3148-5.7371 2.3148-1.5073 0-2.8455-0.35376-4.0144-1.0613s-2.0713-1.7226-2.707-3.0454c-0.63575-1.3228-0.95361-2.8711-0.95361-4.645 0-2.7481 0.687-4.8885 2.061-6.4215 1.374-1.533 3.2812-2.2994 5.7217-2.2994 2.3584 0 4.2323 0.78442 5.6217 2.3533 1.3894 1.5689 2.0841 3.6914 2.0841 6.3677zm-12.843 0c0 2.1533 0.43066 3.7939 1.292 4.9219 0.86133 1.1279 2.1277 1.6919 3.7991 1.6919s2.9403-0.5614 3.8068-1.6842c0.86646-1.1228 1.2997-2.766 1.2997-4.9296 0-2.1431-0.43322-3.7709-1.2997-4.8834-0.86646-1.1126-2.1456-1.6688-3.8375-1.6688-1.6714 0-2.9326 0.54858-3.7837 1.6458-0.85108 1.0972-1.2766 2.7327-1.2766 4.9065zm25.009-8.7209c0.74854 0 1.4202 0.061523 2.0149 0.18457l-0.35376 2.3687c-0.69727-0.15381-1.3125-0.23071-1.8457-0.23071-1.3638 0-2.5301 0.5537-3.4991 1.6611-0.969 1.1074-1.4535 2.4866-1.4535 4.1375v9.0439h-2.5532v-16.857h2.1072l0.29224 3.1223h0.12305c0.62549-1.0972 1.3791-1.9431 2.261-2.5378 0.88184-0.59473 1.8508-0.89209 2.907-0.89209zm13.735-5.3218h6.3523c2.9839 0 5.1423 0.44604 6.4753 1.3381 1.333 0.8921 1.9995 2.302 1.9995 4.2297 0 1.333-0.3717 2.4327-1.1151 3.2992s-1.8278 1.4279-3.2531 1.6842v0.15381c3.4146 0.58448 5.1218 2.3789 5.1218 5.3833 0 2.0098-0.67931 3.5786-2.038 4.7065-1.3586 1.1279-3.2582 1.6919-5.6986 1.6919h-7.8442v-22.487zm2.6147 9.6284h4.3066c1.8457 0 3.1736-0.28967 3.9836-0.86902 0.81006-0.57935 1.2151-1.556 1.2151-2.9301 0-1.2612-0.45117-2.1713-1.3535-2.7301-0.90235-0.55884-2.3379-0.83826-4.3066-0.83826h-3.8452v7.3674zm0 2.2148v8.4133h4.6912c1.815 0 3.1813-0.35119 4.099-1.0536 0.91773-0.7024 1.3766-1.8021 1.3766-3.2992 0-1.3945-0.46911-2.4199-1.4073-3.0762-0.93824-0.65625-2.3661-0.98438-4.2836-0.98438h-4.4758zm19.964 10.644h-2.5532v-23.933h2.5532v23.933zm19.964-8.4441c0 2.7481-0.69213 4.8937-2.0764 6.4369-1.3843 1.5432-3.2966 2.3148-5.7371 2.3148-1.5073 0-2.8455-0.35376-4.0144-1.0613s-2.0713-1.7226-2.707-3.0454c-0.63575-1.3228-0.95361-2.8711-0.95361-4.645 0-2.7481 0.687-4.8885 2.061-6.4215 1.374-1.533 3.2812-2.2994 5.7217-2.2994 2.3584 0 4.2323 0.78442 5.6217 2.3533 1.3894 1.5689 2.0841 3.6914 2.0841 6.3677zm-12.843 0c0 2.1533 0.43066 3.7939 1.292 4.9219 0.86133 1.1279 2.1277 1.6919 3.7991 1.6919s2.9403-0.5614 3.8068-1.6842c0.86646-1.1228 1.2997-2.766 1.2997-4.9296 0-2.1431-0.43322-3.7709-1.2997-4.8834-0.86646-1.1126-2.1456-1.6688-3.8375-1.6688-1.6714 0-2.9326 0.54858-3.7837 1.6458-0.85108 1.0972-1.2766 2.7327-1.2766 4.9065zm24.056 8.7517c-2.4404 0-4.3297-0.75109-5.6678-2.2533-1.3381-1.5022-2.0072-3.6273-2.0072-6.3754 0-2.8198 0.67931-4.9988 2.038-6.5369 1.3586-1.5381 3.2941-2.3071 5.8063-2.3071 0.81006 0 1.6201 0.087157 2.4302 0.26148 0.81006 0.17432 1.4458 0.37939 1.9072 0.61523l-0.78442 2.1687c-0.56397-0.22559-1.1792-0.41272-1.8457-0.5614-0.66651-0.14868-1.2561-0.22302-1.7688-0.22302-3.4248 0-5.1372 2.1841-5.1372 6.5522 0 2.0713 0.41784 3.6606 1.2535 4.7681 0.8357 1.1074 2.0738 1.6611 3.7145 1.6611 1.4048 0 2.8455-0.30249 4.322-0.90747v2.261c-1.1279 0.58448-2.5481 0.87671-4.2605 0.87671zm10.782-8.9363c0.44092-0.62549 1.1125-1.4458 2.0149-2.4609l5.4448-5.7678h3.03l-6.8291 7.1829 7.3059 9.6746h-3.0916l-5.9524-7.9673-1.9226 1.6611v6.3062h-2.5225v-23.933h2.5225v12.689c0 0.56397-0.041015 1.4355-0.12305 2.6147h0.12305zm20.118 8.9363c-2.4404 0-4.3297-0.75109-5.6678-2.2533-1.3381-1.5022-2.0072-3.6273-2.0072-6.3754 0-2.8198 0.67932-4.9988 2.038-6.5369 1.3586-1.5381 3.2941-2.3071 5.8063-2.3071 0.81006 0 1.6201 0.087157 2.4302 0.26148 0.81006 0.17432 1.4458 0.37939 1.9072 0.61523l-0.78442 2.1687c-0.56397-0.22559-1.1792-0.41272-1.8457-0.5614-0.66651-0.14868-1.2561-0.22302-1.7688-0.22302-3.4248 0-5.1372 2.1841-5.1372 6.5522 0 2.0713 0.41784 3.6606 1.2535 4.7681 0.8357 1.1074 2.0738 1.6611 3.7145 1.6611 1.4048 0 2.8455-0.30249 4.322-0.90747v2.261c-1.1279 0.58448-2.5481 0.87671-4.2605 0.87671zm19.795-0.30762v-10.905c0-1.374-0.31274-2.3994-0.93823-3.0762-0.62549-0.67676-1.6047-1.0151-2.9377-1.0151-1.7739 0-3.0685 0.48193-3.8837 1.4458-0.81519 0.96387-1.2228 2.543-1.2228 4.7373v8.8132h-2.5532v-23.933h2.5532v7.2444c0 0.87159-0.041015 1.5945-0.12305 2.1687h0.15381c0.50244-0.81006 1.2176-1.4484 2.1456-1.9149s1.9867-0.69983 3.1761-0.69983c2.061 0 3.6068 0.48962 4.6373 1.4689s1.5458 2.5353 1.5458 4.6681v10.997h-2.5532zm18.165 0l-0.50757-2.3994h-0.12305c-0.84082 1.0562-1.6791 1.7714-2.5148 2.1456-0.8357 0.37427-1.879 0.5614-3.13 0.5614-1.6714 0-2.9813-0.43066-3.9298-1.292s-1.4227-2.0867-1.4227-3.676c0-3.4043 2.7224-5.1885 8.1672-5.3525l2.8608-0.092286v-1.0459c0-1.3228-0.28454-2.2994-0.85364-2.9301-0.5691-0.63062-1.4791-0.94592-2.7301-0.94592-1.4048 0-2.9941 0.43066-4.7681 1.292l-0.78442-1.9534c0.83057-0.45117 1.7406-0.80493 2.7301-1.0613 0.98951-0.25635 1.9816-0.38452 2.9762-0.38452 2.0098 0 3.4991 0.44604 4.4681 1.3381 0.969 0.8921 1.4535 2.3225 1.4535 4.2913v11.505h-1.8918zm-5.7678-1.7996c1.5894 0 2.8378-0.43579 3.7452-1.3074 0.90748-0.87159 1.3612-2.0918 1.3612-3.6606v-1.5227l-2.5532 0.10767c-2.0303 0.071778-3.494 0.38708-4.3912 0.94592-0.89722 0.55884-1.3458 1.4278-1.3458 2.6071 0 0.92286 0.27942 1.6252 0.83826 2.1072 0.55884 0.48194 1.3407 0.7229 2.3456 0.7229zm15.473 1.7996h-2.5532v-16.857h2.5532v16.857zm-2.7686-21.426c0-0.58448 0.14355-1.0126 0.43066-1.2843 0.28711-0.27173 0.64599-0.40759 1.0767-0.40759 0.41016 0 0.76391 0.13843 1.0613 0.41528 0.29736 0.27686 0.44604 0.70239 0.44604 1.2766s-0.14868 1.0023-0.44604 1.2843c-0.29736 0.28198-0.65112 0.42297-1.0613 0.42297-0.43067 0-0.78955-0.14099-1.0767-0.42297-0.28711-0.28198-0.43066-0.71008-0.43066-1.2843zm19.718 21.426v-10.905c0-1.374-0.31274-2.3994-0.93823-3.0762-0.62549-0.67676-1.6047-1.0151-2.9377-1.0151-1.7637 0-3.0557 0.4768-3.876 1.4304s-1.2305 2.5276-1.2305 4.7219v8.844h-2.5532v-16.857h2.0764l0.41528 2.3071h0.12305c0.52295-0.83057 1.2561-1.474 2.1995-1.9303s1.9944-0.68445 3.1531-0.68445c2.0303 0 3.5581 0.48962 4.5835 1.4689s1.5381 2.5455 1.5381 4.6989v10.997h-2.5532zm25.994-20.472c-2.4712 0-4.422 0.82287-5.8524 2.4686-1.4304 1.6458-2.1456 3.899-2.1456 6.7599 0 2.9429 0.68957 5.2167 2.0687 6.8214s3.3453 2.4071 5.8986 2.4071c1.5689 0 3.3581-0.28198 5.3679-0.84595v2.2917c-1.5586 0.58448-3.4812 0.87671-5.7678 0.87671-3.312 0-5.8678-1.0049-7.6674-3.0146-1.7996-2.0098-2.6993-4.8655-2.6993-8.5671 0-2.3174 0.43322-4.3476 1.2997-6.0908 0.86646-1.7432 2.1174-3.0864 3.7529-4.0298 1.6355-0.94336 3.5607-1.415 5.7755-1.415 2.3584 0 4.4194 0.43066 6.1831 1.292l-1.1074 2.2456c-1.7022-0.79981-3.4043-1.1997-5.1064-1.1997zm17.55 3.3069c0.74854 0 1.4202 0.061523 2.0149 0.18457l-0.35376 2.3687c-0.69727-0.15381-1.3125-0.23071-1.8457-0.23071-1.3638 0-2.5301 0.5537-3.4991 1.6611-0.969 1.1074-1.4535 2.4866-1.4535 4.1375v9.0439h-2.5532v-16.857h2.1072l0.29224 3.1223h0.12305c0.62549-1.0972 1.3791-1.9431 2.261-2.5378 0.88184-0.59473 1.8508-0.89209 2.907-0.89209zm11.659 17.473c-2.4917 0-4.4579-0.75878-5.8986-2.2764s-2.161-3.6247-2.161-6.3215c0-2.7173 0.66906-4.8757 2.0072-6.4753 1.3381-1.5996 3.1351-2.3994 5.391-2.3994 2.1123 0 3.7837 0.6947 5.0142 2.0841 1.2305 1.3894 1.8457 3.2223 1.8457 5.4987v1.615h-11.613c0.05127 1.979 0.55114 3.4812 1.4996 4.5066 0.94849 1.0254 2.284 1.5381 4.0067 1.5381 1.815 0 3.6094-0.37939 5.3833-1.1382v2.2764c-0.90235 0.38965-1.756 0.66907-2.5609 0.83826-0.80494 0.16919-1.7765 0.25378-2.9147 0.25378zm-0.69214-15.335c-1.3535 0-2.4327 0.44091-3.2377 1.3228-0.80494 0.88184-1.2792 2.102-1.4227 3.6606h8.8132c0-1.6099-0.35888-2.8429-1.0767-3.6991-0.71778-0.8562-1.7432-1.2843-3.0762-1.2843zm22.718 12.766h-0.13843c-1.1792 1.7124-2.9429 2.5686-5.291 2.5686-2.2046 0-3.9196-0.75365-5.1449-2.261s-1.838-3.6504-1.838-6.4292c0-2.7788 0.61523-4.9372 1.8457-6.4753 1.2305-1.5381 2.9429-2.3071 5.1372-2.3071 2.2866 0 4.04 0.83056 5.2603 2.4917h0.19995l-0.10767-1.2151-0.061524-1.1843v-6.8599h2.5532v23.933h-2.0764l-0.33838-2.261zm-5.1064 0.43066c1.7432 0 3.007-0.47424 3.7914-1.4227 0.78443-0.94849 1.1766-2.4789 1.1766-4.5912v-0.53833c0-2.3892-0.39734-4.0939-1.192-5.1141-0.79468-1.0203-2.0636-1.5304-3.8068-1.5304-1.4971 0-2.6429 0.5819-3.4376 1.7457s-1.192 2.807-1.192 4.9296c0 2.1533 0.39477 3.7786 1.1843 4.8757 0.78955 1.0972 1.9482 1.6458 3.4761 1.6458zm20.057 2.1379c-2.4917 0-4.4579-0.75878-5.8986-2.2764s-2.161-3.6247-2.161-6.3215c0-2.7173 0.66906-4.8757 2.0072-6.4753 1.3381-1.5996 3.1351-2.3994 5.391-2.3994 2.1123 0 3.7837 0.6947 5.0142 2.0841 1.2305 1.3894 1.8457 3.2223 1.8457 5.4987v1.615h-11.613c0.05127 1.979 0.55114 3.4812 1.4996 4.5066 0.94849 1.0254 2.284 1.5381 4.0067 1.5381 1.815 0 3.6094-0.37939 5.3833-1.1382v2.2764c-0.90235 0.38965-1.756 0.66907-2.5609 0.83826-0.80494 0.16919-1.7765 0.25378-2.9147 0.25378zm-0.69214-15.335c-1.3535 0-2.4327 0.44091-3.2377 1.3228-0.80494 0.88184-1.2792 2.102-1.4227 3.6606h8.8132c0-1.6099-0.35888-2.8429-1.0767-3.6991-0.71778-0.8562-1.7432-1.2843-3.0762-1.2843zm22.779 15.027v-10.905c0-1.374-0.31274-2.3994-0.93823-3.0762s-1.6047-1.0151-2.9377-1.0151c-1.7637 0-3.0557 0.4768-3.876 1.4304-0.82032 0.95362-1.2305 2.5276-1.2305 4.7219v8.844h-2.5532v-16.857h2.0764l0.41528 2.3071h0.12305c0.52295-0.83057 1.2561-1.474 2.1995-1.9303s1.9944-0.68445 3.1531-0.68445c2.0303 0 3.5581 0.48962 4.5835 1.4689s1.5381 2.5455 1.5381 4.6989v10.997h-2.5532zm13.243-1.7996c0.45118 0 0.88696-0.033324 1.3074-0.099975 0.42041-0.066651 0.75366-0.13586 0.99976-0.20764v1.9534c-0.27686 0.1333-0.68444 0.24353-1.2228 0.33069s-1.0228 0.13074-1.4535 0.13074c-3.2608 0-4.8911-1.7175-4.8911-5.1526v-10.028h-2.4148v-1.2305l2.4148-1.0613 1.0767-3.5991h1.4766v3.9067h4.8911v1.9841h-4.8911v9.9207c0 1.0151 0.24096 1.7944 0.7229 2.3379s1.1433 0.81518 1.9841 0.81518zm8.2288 1.7996h-2.5532v-16.857h2.5532v16.857zm-2.7686-21.426c0-0.58448 0.14355-1.0126 0.43066-1.2843 0.28711-0.27173 0.64599-0.40759 1.0767-0.40759 0.41016 0 0.76391 0.13843 1.0613 0.41528 0.29736 0.27686 0.44604 0.70239 0.44604 1.2766s-0.14868 1.0023-0.44604 1.2843c-0.29736 0.28198-0.65112 0.42297-1.0613 0.42297-0.43067 0-0.78955-0.14099-1.0767-0.42297-0.28711-0.28198-0.43066-0.71008-0.43066-1.2843zm18.549 21.426l-0.50757-2.3994h-0.12305c-0.84082 1.0562-1.6791 1.7714-2.5148 2.1456-0.8357 0.37427-1.879 0.5614-3.13 0.5614-1.6714 0-2.9813-0.43066-3.9298-1.292s-1.4227-2.0867-1.4227-3.676c0-3.4043 2.7224-5.1885 8.1672-5.3525l2.8608-0.092286v-1.0459c0-1.3228-0.28454-2.2994-0.85364-2.9301-0.5691-0.63062-1.4791-0.94592-2.7301-0.94592-1.4048 0-2.9941 0.43066-4.7681 1.292l-0.78442-1.9534c0.83057-0.45117 1.7406-0.80493 2.7301-1.0613 0.98951-0.25635 1.9816-0.38452 2.9762-0.38452 2.0098 0 3.4991 0.44604 4.4681 1.3381 0.969 0.8921 1.4535 2.3225 1.4535 4.2913v11.505h-1.8918zm-5.7678-1.7996c1.5894 0 2.8378-0.43579 3.7452-1.3074 0.90748-0.87159 1.3612-2.0918 1.3612-3.6606v-1.5227l-2.5532 0.10767c-2.0303 0.071778-3.494 0.38708-4.3912 0.94592-0.89722 0.55884-1.3458 1.4278-1.3458 2.6071 0 0.92286 0.27942 1.6252 0.83826 2.1072 0.55884 0.48194 1.3407 0.7229 2.3456 0.7229zm15.473 1.7996h-2.5532v-23.933h2.5532v23.933zm16.288-4.5989c0 1.5689-0.58447 2.7788-1.7534 3.6299-1.169 0.85108-2.8096 1.2766-4.9219 1.2766-2.2354 0-3.9785-0.35376-5.2295-1.0613v-2.3687c0.81006 0.41016 1.6791 0.73315 2.6071 0.96899s1.8226 0.35376 2.684 0.35376c1.333 0 2.3584-0.21277 3.0762-0.6383s1.0767-1.0741 1.0767-1.9457c0-0.65625-0.28454-1.2176-0.85364-1.6842s-1.6791-1.0177-3.33-1.6534c-1.5689-0.58448-2.684-1.0946-3.3453-1.5304s-1.1536-0.93054-1.4766-1.4843c-0.323-0.55371-0.4845-1.2151-0.4845-1.9841 0-1.374 0.55883-2.4584 1.6765-3.2531 1.1177-0.79468 2.6506-1.192 4.5989-1.192 1.815 0 3.5889 0.36914 5.3218 1.1074l-0.90747 2.0764c-1.6919-0.69727-3.2248-1.0459-4.5989-1.0459-1.21 0-2.1226 0.1897-2.7378 0.56909-0.61524 0.3794-0.92285 0.90234-0.92285 1.5688 0 0.45117 0.11536 0.83569 0.34607 1.1536 0.23071 0.31787 0.60241 0.62036 1.1151 0.90747s1.4971 0.70239 2.9531 1.2458c1.9995 0.72803 3.3505 1.4612 4.0529 2.1995 0.7024 0.73828 1.0536 1.6663 1.0536 2.7839z" fill="#182650" fill-rule="nonzero"></path></g></g></g></svg></a></div></section></section>';

export default COVER_PAGE_ALL_ELEMENTS;