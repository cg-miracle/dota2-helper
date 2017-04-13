;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-wxbzhuye" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M965.963701 486.74685 526.971481 47.839565 89.258395 485.532185c-8.363482 8.383948-8.363482 21.966291 0 30.349215 8.42488 8.385994 21.98778 8.385994 30.349215 0l76.296687-76.252685L195.904297 877.321336c0 30.099529 24.460088 54.580083 54.559617 54.580083l559.219441 0c30.099529 0 54.580083-24.480554 54.580083-54.580083L864.263437 445.791066l71.351048 71.307046c4.15053 4.234441 9.641591 6.246261 15.174608 6.246261 5.449106 0 10.982122-2.012843 15.175631-6.246261C974.347648 508.756119 974.347648 495.131821 965.963701 486.74685M821.337789 877.321336c0 6.415107-5.240351 11.654434-11.655458 11.654434L250.463913 888.97577c-6.415107 0-11.632945-5.239328-11.632945-11.654434L238.830969 396.703067l288.140513-288.204981L821.337789 402.865417 821.337789 877.321336 821.337789 877.321336z"  ></path>' +
    '' +
    '<path d="M406.408615 455.833793c0 66.821895 54.328349 121.193223 121.193223 121.193223 66.862827 0 121.1922-54.371328 121.1922-121.193223 0-66.819848-54.329373-121.149221-121.1922-121.149221C460.736964 334.685595 406.408615 389.013945 406.408615 455.833793M527.600815 377.61022c43.134403 0 78.263481 35.130102 78.263481 78.223572 0 43.179428-35.129078 78.265528-78.263481 78.265528-43.136449 0-78.266551-35.087123-78.266551-78.265528C449.334263 412.740322 484.464365 377.61022 527.600815 377.61022"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconfonthuangguan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M885.395 381.891c-47.236-49.229-110.544-77.299-179.128-79.64l-193.391-119.574-0.876 0 0-182.676-62.905 0 0 183.222-192.507 119.028c-68.618 2.338-132.082 30.384-179.562 79.57-48.965 50.725-75.931 118.595-75.931 191.108 0 72.021 28.492 138.035 80.227 185.883 50.179 46.408 117.875 71.967 190.617 71.967l195.569 0c4.12 0.183 8.256 0.297 12.419 0.297s8.299-0.114 12.419-0.297l197.569 0c72.742 0 140.438-25.559 190.617-71.967 51.735-47.848 80.227-113.862 80.227-185.883C960.759 500.386 933.995 432.54 885.395 381.891zM566.463 748.973c-24.137 10.486-49.391 16.458-75.221 17.807l-22.628 0c-25.831-1.349-51.084-7.32-75.221-17.807-26.641-11.574-50.769-28.073-71.716-49.04-41.677-41.717-65.58-96.702-65.58-150.857 0-27.499 5.91-55.421 17.567-82.991 11.519-27.243 28.552-53.229 49.26-75.149 21.248-22.492 45.49-40.187 72.053-52.595 27.366-12.783 55.948-19.264 84.951-19.264s57.585 6.481 84.951 19.264c26.564 12.408 50.806 30.104 72.053 52.595 20.708 21.92 37.741 47.906 49.26 75.149 11.657 27.57 17.567 55.492 17.567 82.991 0 54.155-23.903 109.14-65.58 150.857C617.232 720.9 593.103 737.399 566.463 748.973zM271.94 766.779c-56.583 0-108.846-19.516-147.162-54.952-38.487-35.595-59.682-84.923-59.682-138.897 0-113.822 84.967-203.433 194.577-206.734-42.16 52.408-67.577 117.656-67.577 182.88 0 84.185 42.329 164.476 108.377 217.703L271.94 766.779zM837.078 711.827c-38.316 35.437-90.579 54.952-147.162 54.952l-30.534 0c66.049-53.227 108.377-133.518 108.377-217.703 0-65.251-25.438-130.526-67.629-182.945 53.337 0.822 102.624 22.07 139.086 60.07 37.108 38.673 57.544 90.782 57.544 146.729C896.759 626.904 875.564 676.232 837.078 711.827zM129.096 896.076l703 0 0 63-703 0 0-63Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-good" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M223.825428 380.983634H114.787784c-20.325148 0-36.859872 16.534724-36.859872 36.859872V918.496808c0 20.325148 16.534724 36.859872 36.859872 36.859872H816.036604c19.436415 0 35.406978-15.120738 36.765674-34.217224l82.673621-480.800166c0.235494-1.376102 0.355288-2.768586 0.355288-4.164142 0-20.325148-16.534724-36.859872-36.859872-36.859871H582.243653a350.71144 350.71144 0 0 0 43.020589-72.181868c19.999552-45.054026 30.141136-93.083463 30.141137-142.753164v-0.122866c-0.005119-1.030029-0.151535-25.450718-2.348793-43.389188a24.694066 24.694066 0 0 0-0.329691-1.969956c-5.895532-42.644824-42.284416-74.522469-85.623435-74.522469-47.376198 0-86.331963 37.787512-87.299534 84.62105-3.938887 62.254276-31.197786 120.17854-76.75454 163.101861-45.749244 43.104548-105.579983 68.658678-168.470091 68.658678M211.538804 906.210184H127.074408V430.130129h84.463372V906.210184h0.001024z m593.963044 0H260.685299v-479.28072c65.798967-5.782904 127.535156-33.333611 176.067321-79.059305 54.66319-51.50348 87.371206-121.029389 92.100532-195.768922l-20.408082-1.29112 20.408082 1.29112c0-20.560641 17.370215-38.577951 38.250308-38.577952 19.048363 0 34.993329 14.241221 37.09127 33.126786l0.060409-0.007167c0.008191 0.067576 0.011263 0.134129 0.019454 0.201705 1.797943 14.676372 1.976099 36.307998 1.98429 37.601165-0.009215 42.734926-8.726575 84.032316-25.914538 122.749516-16.617659 37.435295-40.295007 70.655255-70.373686 98.734286-0.020478 0.019454-0.037884 0.040955-0.057337 0.059385a24.579391 24.579391 0 0 0-1.614667 1.667909l-0.161774 0.186348a24.692018 24.692018 0 0 0-2.667222 3.745372l-0.149487 0.260067a24.712496 24.712496 0 0 0-0.967571 1.909546l-0.093174 0.204777a23.989633 23.989633 0 0 0-0.797607 2.05289l-0.047098 0.140273c-0.233446 0.704433-0.435151 1.423201-0.605117 2.154254l-0.028668 0.12389a24.291679 24.291679 0 0 0-0.414674 2.359032 24.8927 24.8927 0 0 0-0.177132 2.155279l-0.006143 0.244708c-0.006143 0.232422-0.017406 0.462796-0.017407 0.696242 0 0.488393 0.01843 0.971667 0.046075 1.452894 0.003072 0.059385 0.009215 0.119795 0.013311 0.17918 0.049146 0.749484 0.127986 1.489753 0.242661 2.218759l0.007167 0.039932a24.370519 24.370519 0 0 0 2.116371 6.766858l0.029692 0.058361a24.665397 24.665397 0 0 0 1.120131 2.05289c0.025597 0.041979 0.054266 0.082935 0.079863 0.124914 0.403411 0.652215 0.834467 1.284976 1.295215 1.895212 0.038908 0.052218 0.080887 0.102389 0.120818 0.153583a24.767786 24.767786 0 0 0 1.474395 1.747772c0.022525 0.024573 0.041979 0.052218 0.064505 0.076791 0.088054 0.094197 0.181228 0.182252 0.270306 0.274402 0.157678 0.163822 0.317404 0.327643 0.479178 0.487369 0.150511 0.148463 0.304094 0.292831 0.457677 0.437199a25.054474 25.054474 0 0 0 1.949478 1.641288c0.097269 0.07372 0.196586 0.145392 0.295902 0.218088 0.23447 0.172013 0.468939 0.340954 0.708529 0.503751 0.078839 0.053242 0.159726 0.10546 0.239589 0.157679 0.260067 0.172013 0.520134 0.341978 0.784296 0.502728 0.063481 0.038908 0.127986 0.074744 0.191467 0.112627 0.282592 0.168941 0.566209 0.334811 0.85392 0.490441 0.053242 0.028669 0.108532 0.05529 0.162798 0.083959 0.298975 0.159726 0.599997 0.316381 0.904091 0.462796 0.063481 0.030717 0.130033 0.058361 0.194538 0.088054 0.297951 0.140272 0.595901 0.278497 0.897947 0.405458 0.150511 0.063481 0.304094 0.119795 0.455629 0.180204 0.220135 0.088054 0.439247 0.17918 0.66143 0.261091a24.327515 24.327515 0 0 0 3.558002 1.004432l0.125938 0.022525c0.356312 0.069624 0.713648 0.135153 1.076103 0.189419 0.184299 0.027645 0.368599 0.047099 0.553922 0.070648 0.218088 0.027645 0.434127 0.059385 0.654263 0.081911 0.829347 0.083959 1.661766 0.126962 2.495208 0.126962l0.044028-0.002048h357.421984L805.501848 906.210184z" fill="#272536" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-close" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M546.942134 511.818772l327.456957-326.128977c9.617355-9.577423 9.648071-25.135361 0.070648-34.751692-9.577423-9.617355-25.137409-9.647048-34.750668-0.070648L512.119795 477.137729 184.520518 150.868479c-9.616331-9.577423-25.176316-9.545683-34.751692 0.070648-9.577423 9.616331-9.545683 25.174268 0.070648 34.751692l327.457981 326.127953-327.457981 326.128978c-9.616331 9.577423-9.647048 25.135361-0.070648 34.751692a24.496456 24.496456 0 0 0 17.41117 7.231702 24.500552 24.500552 0 0 0 17.340522-7.162078L512.119795 546.499816l327.599276 326.26925a24.492361 24.492361 0 0 0 17.340522 7.162078 24.5026 24.5026 0 0 0 17.41117-7.231702c9.577423-9.617355 9.545683-25.175292-0.070648-34.751692L546.942134 511.818772z" fill="#353535" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-refresh" viewBox="0 0 1025 1024">' +
    '' +
    '<path d="M1000.803878 388.49588c-10.161038-8.99688-25.690307-8.051834-34.688211 2.109204l-61.519126 69.484954c-4.493833-44.37519-15.419713-87.479738-32.656822-128.641976-22.511143-53.755003-54.789128-101.965668-95.933959-143.294799C691.231126 103.00184 577.673029 56.107892 456.249444 56.107892c-60.834147 0-119.860112 11.920073-175.440703 35.42848-53.672069 22.700562-101.869423 55.194586-143.25282 96.579007-41.383397 41.383397-73.877422 89.580751-96.579007 143.25282-23.508407 55.580591-35.42848 114.60758-35.42848 175.440703 0 60.834147 11.920073 119.860112 35.42848 175.440703 22.700562 53.672069 55.194586 101.869423 96.579007 143.25282s89.580751 73.877422 143.25282 96.579007c55.580591 23.508407 114.60758 35.42848 175.440703 35.42848 54.671381 0 108.114099-9.688003 158.841474-28.794727 49.002128-18.457581 94.109396-45.155391 134.065497-79.351113 10.310525-8.824868 11.515638-24.337754 2.691795-34.648279-8.824868-10.310525-24.337754-11.515638-34.648279-2.691795-35.605612 30.473899-75.789016 54.259779-119.433151 70.699282-45.169725 17.012879-92.78244 25.640136-141.517334 25.640136-54.220871 0-106.805574-10.613595-156.296095-31.546931-47.813397-20.222759-90.760267-49.180284-127.645736-86.066777-36.885469-36.885469-65.842994-79.832339-86.066777-127.645736-20.932312-49.490521-31.545907-102.075224-31.545907-156.296095s10.613595-106.805574 31.545907-156.295071c20.223783-47.813397 49.180284-90.760267 86.066777-127.645736 36.886493-36.885469 79.832339-65.842994 127.645736-86.066777 49.489497-20.932312 102.075224-31.545907 156.296095-31.545907 108.254372 0 209.444958 41.755067 284.926808 117.573776 67.949126 68.251172 108.312733 157.16435 115.471739 253.034828l-101.959525-72.125554c-11.078439-7.836818-26.414194-5.209529-34.252036 5.869935-7.837842 11.079463-5.210552 26.415217 5.868911 34.25306l140.842594 99.631209c4.291103 3.03582 9.251828 4.512263 14.179788 4.512263 6.824196 0 13.58491-2.834115 18.410482-8.284256l103.1759-116.535556C1011.909962 413.02203 1010.964916 397.491737 1000.803878 388.49588z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-account" viewBox="0 0 1025 1024">' +
    '' +
    '<path d="M944.02227 920.429904C886.277185 761.905835 771.601005 646.734094 635.487737 602.525797c27.283472-13.498904 52.477195-31.503928 74.632025-53.658758 53.344425-53.344425 82.721743-124.267938 82.721743-199.707809 0-75.439871-29.377318-146.364407-82.721743-199.707809s-124.268962-82.721743-199.708833-82.721743-146.364407 29.377318-199.707809 82.721743S227.981378 273.719359 227.981378 349.158206c0 75.439871 29.377318 146.364407 82.721743 199.707809 22.186571 22.186571 47.422273 40.211048 74.75182 53.71712-136.034428 44.252324-250.634841 159.392324-308.354328 317.846769-2.745037 7.533748-1.640264 15.933703 2.958005 22.502952 4.598269 6.568224 12.112563 10.48049 20.131633 10.48049l820.743405 0c8.018046 0 15.53234-3.912266 20.130609-10.48049C945.662534 936.363607 946.766282 927.964676 944.02227 920.429904zM277.127874 349.158206c0-62.311613 24.266082-120.89526 68.326939-164.956117 44.060857-44.061881 102.644504-68.326939 164.956117-68.326939s120.89526 24.266082 164.956117 68.326939c44.061881 44.060857 68.326939 102.644504 68.326939 164.956117 0 62.312637-24.265058 120.89526-68.326939 164.956117-44.060857 44.061881-102.64348 68.326939-164.956117 68.326939-62.311613 0-120.89526-24.265058-164.956117-68.326939C301.393956 470.053466 277.127874 411.470843 277.127874 349.158206zM136.475723 904.26685c33.140096-75.787992 81.511511-140.31734 141.237813-188.041659 69.148095-55.252948 149.665413-84.457229 232.847905-84.457229 83.181468 0 163.698786 29.204281 232.846881 84.457229 59.727327 47.724319 108.098741 112.254691 141.238837 188.041659L136.475723 904.26685z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-download" viewBox="0 0 1025 1024">' +
    '' +
    '<path d="M472.483146 751.161182c0.122866 0.124914 0.24778 0.248804 0.372694 0.370646 11.174684 10.873662 25.852081 16.831651 41.412066 16.831651 0.277473 0 0.554946-0.001024 0.832419-0.005119 15.837458-0.217064 30.643864-6.574368 41.702849-17.905707L891.545075 410.683475c9.525205-9.667525 9.408482-25.226487-0.259043-34.750668-9.666501-9.524181-25.227511-9.408482-34.750668 0.259043l-315.80719 320.551874L540.728174 87.434687c0-13.5716-11.001648-24.573248-24.573248-24.573248s-24.573248 11.001648-24.573248 24.573248l0 613.073864L170.858816 374.767626c-9.52111-9.670597-25.080071-9.791415-34.750668-0.269282-9.670597 9.52111-9.791415 25.080071-0.270306 34.750668L472.483146 751.161182z"  ></path>' +
    '' +
    '<path d="M879.012719 846.929272 149.753468 846.929272c-13.5716 0-24.573248 11.001648-24.573248 24.573248s11.001648 24.573248 24.573248 24.573248l729.260275 0c13.5716 0 24.573248-11.001648 24.573248-24.573248S892.584319 846.929272 879.012719 846.929272z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-play" viewBox="0 0 1025 1024">' +
    '' +
    '<path d="M512.268258 1022.835842c-68.658678 0-135.399619-13.564433-198.369591-40.316509-60.752236-25.809077-115.373446-62.712976-162.346233-109.685763-46.971763-46.971763-83.875662-101.592974-109.685763-162.346233C15.115619 647.517366 1.551186 580.777449 1.551186 512.118771S15.115619 376.719151 41.866671 313.74918c25.810101-60.752236 62.714-115.373446 109.685763-162.346233 46.972787-46.971763 101.593997-83.875662 162.346233-109.685763 62.969971-26.751052 129.710912-40.315485 198.369591-40.315485s135.398595 13.564433 198.368567 40.315485c60.752236 25.810101 115.373446 62.714 162.346233 109.685763 46.971763 46.972787 83.875662 101.593997 109.685763 162.346233 26.752076 62.969971 40.316509 129.710912 40.316509 198.369591s-13.564433 135.398595-40.316509 198.368567c-25.809077 60.75326-62.712976 115.37447-109.685763 162.346233-46.971763 46.972787-101.592974 83.876686-162.346233 109.685763C647.666853 1009.27141 580.925912 1022.835842 512.268258 1022.835842zM512.268258 50.548195c-62.018782 0-122.293887 12.247716-179.152287 36.403219-54.923257 23.333323-104.317532 56.709936-146.810821 99.204249s-75.870926 91.888588-99.204249 146.810821c-24.155503 56.8584-36.403219 117.133505-36.403219 179.152287 0 62.017758 12.247716 122.292863 36.403219 179.152287 23.333323 54.923257 56.709936 104.317532 99.204249 146.811845 42.493289 42.493289 91.888588 75.870926 146.810821 99.204249 56.8584 24.155503 117.133505 36.403219 179.152287 36.403219 62.017758 0 122.292863-12.247716 179.152287-36.403219 54.923257-23.333323 104.317532-56.71096 146.811845-99.204249 42.493289-42.494313 75.870926-91.888588 99.204249-146.811845 24.155503-56.8584 36.403219-117.133505 36.403219-179.152287s-12.247716-122.293887-36.403219-179.152287c-23.334347-54.923257-56.71096-104.317532-99.205273-146.810821-42.493289-42.493289-91.887565-75.870926-146.810821-99.204249C634.561121 62.795911 574.286016 50.548195 512.268258 50.548195z"  ></path>' +
    '' +
    '<path d="M425.042443 780.041915c-4.373014 0-8.775721-0.898971-12.922457-2.741965-11.492089-5.10714-18.918329-16.5337-18.918329-29.110084L393.201657 285.216568c0-12.522118 7.381189-23.929224 18.804678-29.059913 11.424512-5.130689 24.853792-3.069608 34.214152 5.248436l233.877934 207.8907c12.998224 11.554546 20.492041 28.154799 20.558593 45.545491s-7.299278 34.048283-20.207401 45.701121L446.404787 771.835474C440.438607 777.222135 432.787112 780.041915 425.042443 780.041915zM442.349177 323.719775l0 385.566545L647.51839 524.063417c3.492473-3.153567 4.001344-7.012591 3.993153-9.032716s-0.545731-5.875054-4.063801-9.002L442.349177 323.719775z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-prompt" viewBox="0 0 1025 1024">' +
    '' +
    '<path d="M637.349161 308.770026"  ></path>' +
    '' +
    '<path d="M512.53242 1022.476459c-68.658678 0-135.399619-13.564433-198.369591-40.316509-60.752236-25.809077-115.373446-62.712976-162.346233-109.685763-46.971763-46.971763-83.875662-101.592974-109.685763-162.346233-26.751052-62.969971-40.315485-129.710912-40.315485-198.368567s13.564433-135.399619 40.315485-198.369591c25.810101-60.752236 62.714-115.373446 109.685763-162.346233 46.972787-46.971763 101.593997-83.875662 162.346233-109.685763 62.969971-26.751052 129.710912-40.315485 198.369591-40.315485s135.398595 13.564433 198.368567 40.315485c60.752236 25.810101 115.37447 62.714 162.346233 109.685763 46.972787 46.972787 83.876686 101.593997 109.686787 162.346233 26.752076 62.969971 40.316509 129.710912 40.316509 198.369591s-13.564433 135.398595-40.316509 198.368567c-25.810101 60.75326-62.712976 115.37447-109.685763 162.346233-46.971763 46.972787-101.593997 83.876686-162.346233 109.685763C647.93204 1008.912026 581.190075 1022.476459 512.53242 1022.476459zM512.53242 50.188811c-62.018782 0-122.293887 12.247716-179.152287 36.403219-54.923257 23.333323-104.317532 56.709936-146.810821 99.204249s-75.870926 91.888588-99.204249 146.810821c-24.155503 56.8584-36.403219 117.133505-36.403219 179.152287 0 62.017758 12.247716 122.292863 36.403219 179.152287 23.333323 54.923257 56.709936 104.317532 99.204249 146.811845 42.493289 42.493289 91.888588 75.870926 146.810821 99.204249 56.8584 24.155503 117.133505 36.403219 179.152287 36.403219 62.017758 0 122.293887-12.247716 179.153311-36.403219 54.923257-23.333323 104.317532-56.71096 146.810821-99.204249 42.494313-42.494313 75.87195-91.888588 99.205273-146.811845 24.155503-56.8584 36.403219-117.133505 36.403219-179.152287s-12.247716-122.293887-36.404243-179.152287c-23.333323-54.923257-56.71096-104.317532-99.204249-146.810821-42.494313-42.493289-91.888588-75.870926-146.811845-99.204249C634.825284 62.436527 574.550178 50.188811 512.53242 50.188811z"  ></path>' +
    '' +
    '<path d="M512.442318 767.198298c-14.136785 0-25.597133-11.460348-25.597133-25.597133l0-332.127922c0-14.136785 11.460348-25.597133 25.597133-25.597133s25.597133 11.460348 25.597133 25.597133l0 332.127922C538.039452 755.737949 526.578079 767.198298 512.442318 767.198298z"  ></path>' +
    '' +
    '<path d="M511.381573 319.924232c-17.522773 0-31.778329-14.255555-31.778329-31.778329 0-17.52175 14.255555-31.777305 31.778329-31.777305 17.52175 0 31.777305 14.255555 31.777305 31.777305C543.158878 305.668677 528.903323 319.924232 511.381573 319.924232z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-erweima1688" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M487.693986 918.089302v28.885853c0 6.757643 5.528981 12.286624 12.286624 12.286624h24.574272c6.757643 0 12.286624-5.528981 12.286624-12.286624v-28.885853h-49.14752zM112.600765 424.486474h251.132449c27.1432 0 49.146496-22.003296 49.146495-49.146496V113.91441c0-27.1432-22.003296-49.146496-49.146495-49.146496H113.786424c-27.05617 0-49.023629 21.868143-49.146496 48.923289L63.453245 375.116771a49.146496 49.146496 0 0 0 49.14752 49.369703z m1.185659-310.572064h249.94679v261.425568H112.600765l1.185659-261.425568zM911.511863 64.767914H661.565073c-27.05617 0-49.023629 21.868143-49.146496 48.923289l-1.185659 261.425568a49.146496 49.146496 0 0 0 49.146496 49.369703h251.132449c27.1432 0 49.146496-22.003296 49.146495-49.146496V113.91441c0-27.1432-22.003296-49.146496-49.146495-49.146496z m0 310.572064H660.379414l1.185659-261.425568h249.94679v261.425568zM363.121954 600.359256H113.175164c-27.05617 0-49.023629 21.868143-49.146495 48.923288L62.84301 910.708113a49.146496 49.146496 0 0 0 49.146495 49.369702h251.132449c27.1432 0 49.146496-22.003296 49.146496-49.146495V649.505751c0-27.1432-22.00432-49.146496-49.146496-49.146495z m0 310.572064H111.988481l1.185659-261.425569h249.94679v261.425569zM216.332635 491.092262c-0.046075 0-0.09215-0.007167-0.138225-0.007168h-139.760347c-6.757643 0-12.286624 5.528981-12.286624 12.286624v25.772218c0 6.757643 5.528981 12.286624 12.286624 12.286624h139.760347c0.239589 0 0.473035-0.022525 0.708529-0.035836 93.729534 0.032764 204.606076 0.059385 205.115971 0.005119v-50.364919c-0.485322-0.051194-111.847185 0.003072-205.686275 0.057338zM805.778297 541.3937c0.235494 0.013311 0.469963 0.035836 0.708528 0.035836h139.760347c6.757643 0 12.286624-5.528981 12.286624-12.286624v-12.440207V503.370694c0-6.757643-5.528981-12.286624-12.286624-12.286623h-139.760347c-0.047099 0-0.09215 0.006143-0.138224 0.007167-93.83909-0.05529-205.200953-0.109556-205.686275-0.057338v50.364919c0.509895 0.054266 111.387461 0.027645 205.115971-0.005119zM640.594877 590.957941h-24.573247c-6.757643 0-12.286624 5.528981-12.286624 12.286624v344.546626c0 6.757643 5.528981 12.286624 12.286624 12.286624h24.573247c6.757643 0 12.286624-5.528981 12.286624-12.286624V603.244565c0-6.757643-5.528981-12.286624-12.286624-12.286624zM946.73659 590.957941h-24.573248c-6.757643 0-12.286624 5.528981-12.286624 12.286624v344.546626c0 6.757643 5.528981 12.286624 12.286624 12.286624h24.573248c6.757643 0 12.286624-5.528981 12.286623-12.286624V603.244565c0-6.757643-5.528981-12.286624-12.286623-12.286624zM695.366599 787.543923h167.92948c6.757643 0 12.286624-5.528981 12.286624-12.286624v-26.033308c0-6.757643-5.528981-12.286624-12.286624-12.286624H695.366599c-6.757643 0-12.286624 5.528981-12.286624 12.286624v26.033308c0 6.757643 5.528981 12.286624 12.286624 12.286624zM864.319964 907.926216H696.390484c-6.757643 0-12.286624 5.528981-12.286624 12.286624v26.033308c0 6.757643 5.528981 12.286624 12.286624 12.286624h167.92948c6.757643 0 12.286624-5.528981 12.286624-12.286624v-26.033308c0-6.757643-5.528981-12.286624-12.286624-12.286624zM522.847041 65.995552h-24.801574c-6.757643 0-12.286624 5.528981-12.286624 12.286624v89.470172c0 0.19761 0.020478 0.3901 0.029693 0.585662l-0.645048 252.841314c-0.002048 0.908186 0.048123 1.80511 0.141296 2.687699h48.864927c0.089078-0.839586 0.137201-1.691459 0.139249-2.55357l0.641976-251.407874c0.124914-0.700338 0.202729-1.418081 0.202729-2.153231V78.282176c0-6.757643-5.528981-12.286624-12.286624-12.286624zM485.758843 618.261891c0 0.19761 0.020478 0.3901 0.029693 0.585662l-0.645048 252.841314c-0.002048 0.908186 0.048123 1.80511 0.141296 2.687699h48.864927c0.089078-0.839586 0.137201-1.691459 0.139249-2.55357l0.641976-251.407874c0.124914-0.700338 0.202729-1.418081 0.202729-2.153231v-26.280065h-49.374822v26.280065z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wanjiaqushi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M495.34976 482.66752l0.41472-0.00512c35.49184 1.55136 71.71072 9.71776 108.50304 24.56064 69.94432 28.20096 115.9168 71.02976 116.34688 71.43936l0.02048-0.0256a23.57248 23.57248 0 0 0 16.24064 6.50752 23.67488 23.67488 0 0 0 23.64928-23.64928 23.58272 23.58272 0 0 0-7.40864-17.14688l0.02048-0.0256c-2.07872-1.9712-51.82976-48.5888-129.57184-80.3072a423.51616 423.51616 0 0 0-23.97696-8.92928c63.78496-36.36736 106.88512-105.0112 106.88512-183.54176 0-116.41856-94.70976-211.12832-211.1232-211.12832-116.41856 0-211.12832 94.70976-211.12832 211.12832 0 75.50976 39.8592 141.87008 99.62496 179.2a354.95424 354.95424 0 0 0-63.744 27.55072c-51.85536 28.57984-95.20128 65.64352-128.82944 110.17216-26.91072 35.64032-47.62112 76.01152-61.54752 120.0128-22.17984 70.0672-19.99872 126.67392-19.4816 135.66464-0.0768 6.36416 2.28352 10.71104 4.52096 13.36832 2.94912 3.52256 8.70912 7.71584 19.39968 7.71584 12.48256 0 22.69184-10.09152 23.26016-22.9632l0.01536-0.47104 0.0512-0.00512-0.03072-0.50176c0.0512-1.7408 0.02048-3.67616-0.19456-5.67296-0.27648-15.7184 0.76288-59.81696 17.55648-112.86528 28.0832-88.72448 84.64384-157.04064 168.1152-203.04384 45.56288-25.10848 92.97408-37.53984 141.80864-37.30432 3.5072 0.1792 7.04512 0.26624 10.60352 0.26624zM331.51488 271.54944c0-90.33728 73.49248-163.83488 163.83488-163.83488 90.33728 0 163.83488 73.4976 163.83488 163.83488s-73.4976 163.82976-163.83488 163.82976S331.51488 361.8816 331.51488 271.54944z" fill="" ></path>' +
    '' +
    '<path d="M919.80288 612.15744H481.87904a20.89472 20.89472 0 0 0-20.87936 20.87936v300.54912a20.89472 20.89472 0 0 0 20.87936 20.87936h437.91872a20.89472 20.89472 0 0 0 20.87936-20.87936V633.0368a20.89472 20.89472 0 0 0-20.87424-20.87936z m-18.53952 302.8992H500.40832v-263.49056h400.85504v263.49056z" fill="" ></path>' +
    '' +
    '<path d="M632.08448 784.10752l79.67744 81.37216 148.6592-120.79104-24.14592-29.71648-121.5744 98.78528-79.08864-80.77824-102.99392 79.67232 23.42912 30.2848 76.03712-58.8288z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)