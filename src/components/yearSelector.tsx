"use client"

import { useTranslation } from "react-i18next"
import { Dropdown } from "@heroui/react/dropdown"
import { Button } from "@heroui/react/button"
import { Label } from "@heroui/react/label"

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
      <span className="text-sm text-foreground/80">{t("statistics.yearSelector")}:</span>
      <Dropdown>
        <Button
          variant="outline"
          className="min-w-[120px]"
          size="sm"
        >
          {getLabel()}
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            aria-label={t("statistics.yearSelector")}
            onAction={(key) => {
              const yearValue = key === "recent" ? undefined : parseInt(key as string)
              onYearChange(yearValue)
            }}
            selectedKeys={selectedYear ? [selectedYear.toString()] : ["recent"]}
            selectionMode="single"
          >
            {[
              <Dropdown.Item key="recent" id="recent" textValue={t("statistics.recentYear")}>
                <Dropdown.ItemIndicator />
                <Label>{t("statistics.recentYear")}</Label>
              </Dropdown.Item>,
              ...years.map((year) => (
                <Dropdown.Item key={year} id={year.toString()} textValue={year.toString()}>
                  <Dropdown.ItemIndicator />
                  <Label>{year}</Label>
                </Dropdown.Item>
              )),
            ]}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
}
