"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FilterOption {
  id: string
  label: string
}

interface FilterSection {
  id: string
  title: string
  type: 'checkbox' | 'radio' | 'range'
  options?: FilterOption[]
  range?: {
    min: number
    max: number
    step: number
  }
}

export interface ProductFilterProps {
  filterSections: FilterSection[]
}

export function ProductFilter({ filterSections }: ProductFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Record<string, any>>({})

  useEffect(() => {
    const initialFilters: Record<string, any> = {}
    filterSections.forEach(section => {
      if (section.type === 'range') {
        const rangeValue = searchParams.get(section.id)
        if (rangeValue) {
          initialFilters[section.id] = rangeValue.split(',').map(Number)
        }
      } else {
        const value = searchParams.get(section.id)
        if (value) {
          initialFilters[section.id] = value.split(',')
        }
      }
    })
    setFilters(initialFilters)
  }, [searchParams, filterSections])

  const updateFilters = (newFilters: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','))
      } else if (typeof value === 'string') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`?${params.toString()}`)
  }

  const handleCheckboxChange = (sectionId: string, optionId: string) => {
    const newFilters = { ...filters }
    if (!newFilters[sectionId]) {
      newFilters[sectionId] = []
    }
    const index = newFilters[sectionId].indexOf(optionId)
    if (index > -1) {
      newFilters[sectionId].splice(index, 1)
    } else {
      newFilters[sectionId].push(optionId)
    }
    if (newFilters[sectionId].length === 0) {
      delete newFilters[sectionId]
    }
    updateFilters(newFilters)
  }

  const handleRadioChange = (sectionId: string, optionId: string) => {
    updateFilters({ ...filters, [sectionId]: optionId })
  }

  const handleRangeChange = (sectionId: string, value: number[]) => {
    updateFilters({ ...filters, [sectionId]: value })
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    router.push(`?${params.toString()}`)
  }
  


  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      id='product-filter'
      className="w-full max-w-xs bg-white dark:text-black p-4 rounded-lg shadow-lg space-y-4"
    >
      <Accordion type="multiple" className="w-full">
        {filterSections.map((section) => (
          <AccordionItem value={section.id} key={section.id}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              {section.type === 'checkbox' && section.options && (
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`${section.id}-${option.id}`}
                        checked={(filters[section.id] || []).includes(option.id)}
                        onCheckedChange={() => handleCheckboxChange(section.id, option.id)}
                      />
                      <Label htmlFor={`${section.id}-${option.id}`}>{option.label}</Label>
                    </motion.div>
                  ))}
                </div>
              )}
              {section.type === 'radio' && section.options && (
                <RadioGroup
                  value={filters[section.id]}
                  onValueChange={(value) => handleRadioChange(section.id, value)}
                >
                  {section.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={`${section.id}-${option.id}`} />
                      <Label htmlFor={`${section.id}-${option.id}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {section.type === 'range' && section.range && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Slider
                    min={section.range.min}
                    max={section.range.max}
                    step={section.range.step}
                    value={filters[section.id] || [section.range.min, section.range.max]}
                    onValueChange={(value) => handleRangeChange(section.id, value)}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2">
                    <span>${filters[section.id]?.[0] || section.range.min}</span>
                    <span>${filters[section.id]?.[1] || section.range.max}</span>
                  </div>
                </motion.div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 space-x-2"
      >
        <Button onClick={clearFilters}>Clear Filters</Button>
      </motion.div>
    </motion.div>
  )
}