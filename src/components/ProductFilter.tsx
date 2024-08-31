"use client"

import React, { useState } from 'react'
import { Checkbox } from "./ui/checkbox"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from './ui/slider'

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

interface ProductFilterProps {
  filterSections: FilterSection[]
  onFilterChange: (filters: Record<string, any>) => void
}

export function ProductFilter({ filterSections, onFilterChange }: ProductFilterProps) {
  const [filters, setFilters] = useState<Record<string, any>>({})

  const handleCheckboxChange = (sectionId: string, optionId: string) => {
    setFilters(prev => {
      const updatedFilters = { ...prev }
      if (!updatedFilters[sectionId]) {
        updatedFilters[sectionId] = []
      }
      const index = updatedFilters[sectionId].indexOf(optionId)
      if (index > -1) {
        updatedFilters[sectionId].splice(index, 1)
      } else {
        updatedFilters[sectionId].push(optionId)
      }
      return updatedFilters
    })
  }

  const handleRadioChange = (sectionId: string, optionId: string) => {
    setFilters(prev => ({
      ...prev,
      [sectionId]: optionId
    }))
  }

  const handleRangeChange = (sectionId: string, value: number[]) => {
    setFilters(prev => ({
      ...prev,
      [sectionId]: value
    }))
  }

  const applyFilters = () => {
    onFilterChange(filters)
  }

  const clearFilters = () => {
    setFilters({})
    onFilterChange({})
  }

  return (
    <div className="w-full max-w-xs">
      <Accordion type="multiple" className="w-full">
        {filterSections.map((section) => (
          <AccordionItem value={section.id} key={section.id}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              {section.type === 'checkbox' && section.options && (
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <div className="flex items-center space-x-2" key={option.id}>
                      <Checkbox
                        id={`${section.id}-${option.id}`}
                        checked={(filters[section.id] || []).includes(option.id)}
                        onCheckedChange={() => handleCheckboxChange(section.id, option.id)}
                      />
                      <Label htmlFor={`${section.id}-${option.id}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              )}
              {section.type === 'radio' && section.options && (
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <div className="flex items-center space-x-2" key={option.id}>
                      <input
                        type="radio"
                        id={`${section.id}-${option.id}`}
                        name={section.id}
                        value={option.id}
                        checked={filters[section.id] === option.id}
                        onChange={() => handleRadioChange(section.id, option.id)}
                        className="text-primary"
                      />
                      <Label htmlFor={`${section.id}-${option.id}`}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              )}
              {section.type === 'range' && section.range && (
                <div>
                  <Slider
                    min={section.range.min}
                    max={section.range.max}
                    step={section.range.step}
                    value={filters[section.id] || [section.range.min, section.range.max]}
                    onValueChange={(value) => handleRangeChange(section.id, value)}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2">
                    <span>{filters[section.id]?.[0] || section.range.min}</span>
                    <span>Ksh {filters[section.id]?.[1] || section.range.max}</span>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-4 space-x-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
      </div>
    </div>
  )
}