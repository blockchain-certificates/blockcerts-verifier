import {html} from '@polymer/lit-element';
export default html`<style>.buv-o-link{cursor:pointer;text-decoration:none;color:currentColor}.buv-o-link__text--underline{border-bottom:1px solid}.buv-o-text-11{font-size:11px}.buv-o-text-12{font-size:12px}.buv-o-text-13{font-size:13px}.buv-o-text-15{font-size:15px;line-height:20px}.buv-o-text-bold{font-weight:bold}.buv-o-text-11{font-size:11px}.buv-o-text-12{font-size:12px}.buv-o-text-13{font-size:13px}.buv-o-text-15{font-size:15px;line-height:20px}.buv-o-text-bold{font-weight:bold}.buv-c-badge{position:relative}.buv-c-badge::before{content:'';position:absolute;left:-32px;top:0;width:12px;height:12px;background-color:#fff;border-radius:50%;-webkit-transition:all .2s ease-out;-o-transition:all .2s ease-out;transition:all .2s ease-out;z-index:2;box-sizing:content-box;box-shadow:0 2px 4px 0 rgba(22,40,55,0.21)}.buv-c-badge--medium::before{left:-38px;top:-4px;width:24px;height:24px}.buv-c-badge--large::before{width:38px;height:38px;left:-45px;top:-9px}.buv-c-verification-step{position:relative;margin:15px 0 5px;font-weight:600}.buv-c-verification-step.is-first{margin-top:0}.buv-c-verification-substep{margin:0;font-weight:400;color:rgba(3,21,50,0.7);padding:3px 0 0;line-height:1.71428571}.buv-c-verification-step.is-success::before,.buv-c-verification-step.is-failure::before{left:-38px;top:-4px;width:24px;height:24px}.buv-c-verification-substep::before{left:-28px;top:10px;width:4px;height:4px;background-color:rgba(255,255,255,0.8)}.buv-c-verification-step::after{content:'';position:absolute;z-index:3;-webkit-transition:opacity .3s ease-out .2s;-o-transition:opacity .3s ease-out .2s;transition:opacity .3s ease-out .2s;opacity:0}.buv-c-verification-step.is-success::after,.buv-c-verification-step.is-failure::after{opacity:1}.buv-c-verification-step.is-success::after{border:solid #2ab27b;border-width:0 2px 2px 0;left:-29px;width:5px;height:11px;transform:rotate(45deg)}.buv-c-verification-step.is-success.is-test::after{border-color:#031532}.buv-c-verification-step.is-failure::after{content:'\\274C';left:-32px;top:-1px;font-size:11px;color:#d0021b}@supports (-ms-ime-align: auto){.buv-c-verification-step.is-failure::after{left:-34px}}.buv-c-final-verification-step{white-space:nowrap;opacity:0;position:relative;font-weight:600;font-size:15px;color:#031532;margin-top:15px}.buv-c-final-verification-step.is-success{font-size:21px;color:#2ab27b;line-height:19px}.buv-c-final-verification-step--standalone{margin-top:0}.buv-c-final-verification-step.is-test,.buv-c-final-verification-step--standalone.is-success{font-size:15px;color:#031532}.buv-c-final-verification-step.is-failure{font-size:13px;font-weight:400}.buv-c-verification-step__description{margin:0}.buv-c-final-verification-step.is-visible{opacity:1}.buv-c-final-verification-step.is-visible::after{opacity:1}.buv-c-final-verification-step::after{position:absolute;content:'';height:26px;width:23px;left:-37px;top:-3px;background-image:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyM3B4IiB2aWV3Qm94PSIwIDAgMjAgMjMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0iVmVyaWZpY2F0aW9uIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NC4wMDAwMDAsIC00NzQuMDAwMDAwKSIgZmlsbD0iIzJBQjI3QiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQ4LjAwMDAwMCwgNDY5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2LDUgTDYsOS4xODE4MTgxOCBMNiwxNS40NTQ1NDU1IEM2LDIxLjI1NjgxODIgMTAuMjY2NjY2NywyNi42ODI3MjczIDE2LDI4IEMyMS43MzMzMzMzLDI2LjY4MjcyNzMgMjYsMjEuMjU2ODE4MiAyNiwxNS40NTQ1NDU1IEwyNiw5LjE4MTgxODE4IEwxNiw1IEwxNiw1IFogTTksMTcuNzUzNzE1NSBMMTAuNTI3NSwxNi4yNTY5MDAyIEwxMy4zMzMzMzMzLDE4Ljk5NTc1MzcgTDIwLjQ3MjUsMTIgTDIyLDEzLjUwNzQzMSBMMTMuMzMzMzMzMywyMiBMOSwxNy43NTM3MTU1IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=");background-repeat:no-repeat;background-position:center;background-size:contain;z-index:3}.buv-c-final-verification-step.is-test::after{background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4IiBmaWxsPSIjRjVBNjIzIj48cGF0aCBkPSJNLjUgMTZoMTdMOSAxIC41IDE2em05LjUtMkg4di0yaDJ2MnptMC0zSDhWN2gydjR6Ii8+PC9zdmc+IA==")}.buv-c-final-verification-step.is-failure::after{content:'\\274C';font-size:17px;top:-1px;color:#d0021b;background:none}.buv-c-final-verification-step--standalone-wrapper{padding:10px;box-sizing:border-box;border-left:3px solid}.buv-c-final-verification-step--standalone-wrapper.is-success{background-color:rgba(42,178,123,0.1);border-color:#2ab27b}.buv-c-final-verification-step--standalone-wrapper.is-failure{background-color:rgba(208,2,27,0.1);border-color:#d0021b}.buv-c-final-verification-step--standalone-wrapper.is-test{background-color:rgba(245,166,35,0.1);border-color:#f5a623}.buv-c-final-verification-step--standalone{margin:0 0 5px 30px;white-space:unset}.buv-c-final-verification-step--standalone.is-failure{margin-bottom:0}.buv-c-final-verification-step--standalone::after{left:-30px}.buv-c-verification-substep.is-final{display:none;line-height:1.35}.buv-c-verification-substep.is-final.is-visible{display:block}.buv-c-verification-substep::after{display:none}.buv-u-excluded-from-flow{position:absolute}.buv-u-full-width{width:100%}.buv-c-suite-verification-status{margin-left:40px;font-weight:400;font-size:13px}
</style>`;