Feature: Web Application Search
  As a user I want to test search functionality to verify it works correctly

  @web
  Scenario: Successful login with valid credentials
    Given I am on the home page
    When I perform search for "car loan"
    Then I sort the displayed result from Low to High
