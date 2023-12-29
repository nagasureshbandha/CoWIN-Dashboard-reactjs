// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    fetchedData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const updatedData = {
        last7daysVaccination: fetchedData.last_7_days_vaccination,
        vaccinationByAge: fetchedData.vaccination_by_age,
        vaccinationByGender: fetchedData.vaccination_by_gender,
      }
      this.setState({
        fetchedData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationState = () => {
    const {fetchedData} = this.state
    const {
      last7daysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = fetchedData
    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={last7daysVaccination}
        />
        <VaccinationByGender vaccinationByGenderDetails={vaccinationByGender} />
        <VaccinationByAge vacinationByAgeDetails={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderViewBasedOnAPIStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationState()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="covid-dashboard-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo"
              alt="website logo"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination in India</h1>
          {this.renderViewBasedOnAPIStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
