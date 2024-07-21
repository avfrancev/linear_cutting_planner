<template lang="pug">
dialog(id="my_modal_2" class="modal ")
  .modal-box.overflow-hidden
    textarea.textarea.w-full.textarea-bordered(v-model="onShapeCutList" :rows="+onShapeCutList.split(`\n`).length" )
    form.flex.justify-end.join.mt-5.block(method="dialog")
      button.join-item.btn Cancel
      button.join-item.btn.btn-primary(@click="doParseOnshapeCutList") Parse

  form(method="dialog" class="modal-backdrop")
    button.close
.container.mx-auto
  .navbar.my-4
    h1.text-xl.flex.space-x-3.text-primary
      i-streamline:cut-solid.ml-3
      span Linear cutting planner
    .flex-1
    .flex-none
      label.flex.input.input-sm.space-x-2.input-bordered.items-baseline.mr-6
        i-mdi:saw-blade.self-center
        pre Blade thickness:
        input.text-right(type="number" v-model.number="bladeThickness" class="w-12")
      .dropdown.dropdown-end
        div(tabindex="0" role="button" class="btn btn-ghost rounded-btn")
          i-mdi:import.text-xl
          span Import
        ul(tabindex="0" class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-0 w-52 p-2 shadow")
          li
            a(onclick="my_modal_2.showModal()") Onshape cutlist

      
  //- div(v-for="c,i in cutList")
    pre {{ c.cuttingPlan }}
  //- pre {{ cutList }}
  //- pre {{ stockList }}
  //- .flex.justify-center.space-x-12
  //- .flex.justify-center.items-center.h-24.space-x-12.pt-24(v-if="Object.entries(stockList).length === 0")
  div.flex.my-24.h-24.space-x-12.justify-center.items-center(v-if="stockList.length === 0")
    button.btn.w-48.my-42(@click="addMaterial()") Add material
    .divider.divider-horizontal OR
    button.btn.w-48.my-4d(onclick="my_modal_2.showModal()") Import onshape cutlist
  //- h1.py-12 Required parts
  //- h1 Kerf / Blade thickness
  //- h1 Available stocks
  //- pre {{ stockList }}
  //- div(v-for="m in stockList" :key="m.material")
    div {{ m.material }}
    input.input(v-model="m.length")
    input.input(v-model="m.qty")
    
    div(v-for="c in m.cuttingPlan") {{ c }}
  .space-y-12.mt-12
    div(v-for="m in stockList" :key="m.id")
      .flex.space-x-2
        .flex.mb-2
          input.input.input-sm.text-lg.font-bold.input-ghost.w-36(type='text' @change="(e) => m.material = e.target.value" :value="m.material")
          //- label.flex.input.input-sm.space-x-2.input-ghost.items-baseline 
          //-   span.mr-4.text-xs Quantity
          //-   input.w-10.text-right.font-bold(type="number" v-model.number="m.qty")
          label.flex.input.input-sm.space-x-2.items-baseline 
            span.mr-4.text-xs Length:
            input.w-14.font-bold.text-right(type="number" v-model.number="m.length")
            span.text-xs mm
          .flex.text-sm.space-x-2.items-baseline.leading-8.mr-4
            div.mr-4.text-xs
            | Quantity:
            b [ {{ m.qty }} ]
          .flex.text-sm.space-x-2.items-baseline.leading-8.mr-4
            div.mr-4.text-xs
            | Waste:
            b [ {{ m.waste }} mm ({{ (m.waste * 100 / (m.length * m.qty))?.toFixed(2) }}%) ]

          button.btn.btn-sm.btn-square.btn-outline.ml-4(
            class="hover:btn-error hover:text-error-content btn-ghost"
            @click="stockList.splice(stockList.indexOf(m), 1)")
            i-mdi:trash
      .grid.w-32.mb-4
        .join.my-1(v-for="c,i in m.cuts")
          label.join-item.flex.input.input-sm.input-bordered.space-x-2 
            input.w-14.text-right(type="number" v-model.number="c.length")
            span mm
          label.join-item.flex.input.input-sm.input-bordered.space-x-2 
            span qty:
            input.w-14.text-right(type="number" v-model.number="c.qty")
          button.btn.btn-sm.btn-square.join-item.btn-outline.ml-4(
            class="hover:btn-error hover:text-error-content btn-ghost"
            @click="m.cuts.splice(m.cuts.indexOf(c), 1)")
            i-mdi:trash
        //- button.mx-12.btn.btn-xs.btn-outline.mt-3.block(
        button.btn.btn-xs.btn-outline.mt-3.blockd(
          @click="m.cuts.push({length: 1, qty: 1})")
          i-mdi:add
          span add

      //- div(v-for="c in m.cuttingPlan") {{ c }}
      .space-y-1
        //- .flex.h-6.w-full.bg-base-300.rounded.overflow-hidden(v-for="P in m.cuttingPlan")
        .flex.h-116.w-full.bg-base-300.rounded.overflow-hidden(v-for="P in m.cuttingPlan")
          template(v-for="c in P")
            .bg-accent.text-accent-content.text-center.content-center.outline.outline-accent-content(
              :style="{width: c /  m.length*100 + '%'}"
              ) {{ c }}
            pre(
              :style="{width: bladeThickness /  m.length*100 + '%'}"
              )

          //- pre {{ P }}
      //- .space-y-1
        .flex.h-6.w-full.bg-base-300.rounded.overflow-hidden(v-for="P in m.cuttingPlan")
          .bg-accent.text-accent-content.text-center.content-center.outline.outline-accent-content(
            v-for="p in P"
            :style="{width: p ? (p/(m.length || 6000)*100 + '%') : 'auto'}"
            :class="{ 'bg-error text-error-content': !p }"
            ) {{ p ? p : ' ERR ' }}
            pre(
              :style="{width: p ? (p/(100)*100 + '%') : 'auto'}"
              ) a aaaa
          pre.content-center.text-center.flex-1.px-2(v-if="(m.length || 6000) - P.sum") {{(m.length || 6000) - P.sum}}
  .flex.justify-center.my-12(v-if="stockList.length > 0")
    button.btn.w-48.my-42(@click="addMaterial()") Add material
  //- .text-xs
    .flex
      p(v-for="i in input1")
        input.input(type="number" v-model.number="i.size")
        input.input(type="number" v-model.number="i.count")
    p(v-for="s in output1")
      pre stock.size: {{ s.stock.size }} X {{ s.count }}
      p s.cuts {{ s.cuts }}
      .flex.h-6.w-full.bg-base-300.rounded.overflow-hidden
        .bg-accent.text-accent-content.text-center.content-center.outline.outline-accent-content(
          v-for="c in s.cuts"
          :style="{width: c ? (c/(s.stock.size || 6000)*100 + '%') : 'auto'}"
          :class="{ 'bg-error text-error-content': !c }"
          ) {{ c ? c : ' ERR ' }}
    //- pre.text-xs {{ output1 }}  
</template>
  
<script setup>
// material	Qty	Length	Angle 1	Angle 2
// 40x40	2	800 mm	45 deg	45 deg
// 40x40	2	3000 mm	45 deg	45 deg
// 40x40	4	760 mm	0 deg	0 deg
// 20x20	2	2920 mm	0 deg	0 deg
// 20x40	12	740 mm	0 deg	0 deg
// 20x20	2	720 mm	0 deg	0 deg
// DPK 140x20	10	720 mm	0 deg	0 deg
// DPK 140x20	10	2920 mm	0 deg	0 deg


const bladeThickness = ref(2)
  
const parseOnshapeCutList = (s) => {
  const lines = s.split('\n').filter(line => line.trim() !== '')
  const objects = lines.map(line => {
    // const [material, qty, length, angle1, angle2, materialMaxLength] = line.split('\t')
    const [material, qty, length, angle1, angle2, materialMaxLength] = line.trim().split(/\t/)
    // console.log(material, qty, length, angle1, angle2, materialMaxLength);
    return { material: material.trim(),
      qty: parseInt(qty),
      length: parseFloat(length),
      angle1: parseFloat(angle1),
      angle2: parseFloat(angle2),
    }
  })
  return objects
}
  
const onShapeCutList__ = ref(`
  40x40	2	800 mm	45 deg	45 deg
  40x40	2	3000 mm	45 deg	45 deg
  40x40	4	760 mm	0 deg	0 deg
  20x20	2	2920 mm	0 deg	0 deg
  20x40	12	740 mm	0 deg	0 deg
  20x20	2	720 mm	0 deg	0 deg
  DPK 140x20	10	720 mm	0 deg	0 deg
  DPK 140x20	10	2920 mm	0 deg	0 deg
  `)
const onShapeCutList = ref(`
  40x40	4	760 mm	0 deg	0 deg
  DPK 140x20	10	720 mm	0 deg	0 deg
  DPK 140x20	10	2920 mm	0 deg	0 deg
  40x40	4	1760 mm	0 deg	0 deg
`)

const stockList = reactive([])
let materialCounter = 0
const defaultMaterialMaxLength = 6000
const defaultCut = { qty: 1, length: 1111, }

let parsedOnShapeCutList = computed(() => {
  const result = {}
  parseOnshapeCutList(onShapeCutList.value).forEach(cut => {
    if (!result[cut.material]) {
      result[cut.material] = { material: cut.material, cuts: [] }
    }
    result[cut.material].cuts.push(cut)
  })
  return Object.values(result)
})

function addMaterial(material = `Material ${materialCounter}`, qty = 1, length = defaultMaterialMaxLength, cuts = [{...defaultCut}]) {
  let o = reactive({
    id: materialCounter,
    material, length, cuts,
    qty: computed(() => o.cuttingPlan.length),
    sum: computed(() => o.cuttingPlan.reduce((a, b) => a + b.reduce((_a, _b) => _a + _b,0), 0)),
    waste: computed(() => o.length * o.qty - o.sum),
    // waste: computed(() => o.length - o.cuttingPlan.reduce((a, b) => a + b, 0)),
    cuttingPlan: computed(() => {
      // console.log('cuttingPlan', cuts, {maxCutLength: o.length, qty: o.qty});
      return cuttingPlan(o.cuts, {maxCutLength: o.length, bladeThickness: bladeThickness.value})
    })
  })
  stockList.push(o)
  materialCounter++
}

function doParseOnshapeCutList() {
  materialCounter = 0
  stockList.splice(0, stockList.length)
  parsedOnShapeCutList.value.forEach(m => {
    addMaterial(m.material, 1, defaultMaterialMaxLength, m.cuts)
    // console.log('addToStockList', m.material, 1, defaultMaterialMaxLength, m.cuts);
  })
}

import { cuttingPlan } from './cutting'



</script>