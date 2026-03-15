"use client"

import { useTranslation } from "react-i18next"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react"

interface YearSelectorProps {
  selectedYear: number | undefined
  onYearChange: (year: number | undefined) => void
}

export default function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  const { t } = useTranslation()

  // Generate years from 2013 to current year in descending order
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2013 + 1 }, (_, i) => currentYear - i)

  // Determine display label
  const getLabel = () => {
    if (!selectedYear || selectedYear === 0) {
      return t("statistics.recentYear")
    }
    return selectedYear.toString()
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-default-600">{t("statistics.yearSelector")}:</span>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="min-w-[120px]"
            size="sm"
          >
            {getLabel()}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Year selection"
          onAction={(key) => {
            const yearValue = key === "recent" ? undefined : parseInt(key as string)
            onYearChange(yearValue)
          }}
          selectedKeys={selectedYear ? [selectedYear.toString()] : ["recent"]}
          selectionMode="single"
        >
          {[
            <DropdownItem key="recent" textValue="recent">
              {t("statistics.recentYear")}
            </DropdownItem>,
            ...years.map((year) => (
              <DropdownItem key={year.toString()} textValue={year.toString()}>
                {year}
              </DropdownItem>
            )),
          ]}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
