Feature: As a user I want to navigate through various pages of BFL mobile app

  @mobile
  Scenario: POC for appium
    Given I launch the Bajaj app
    Then I continue with providing MPIN
    Then I perform the search for car loan
    Then I navigate back to Home Page
    Then I navigate to Home Loan Page
    Then I verify user is on Home Loan Page
    Then I select different EMI Term options on Home Loan Page



