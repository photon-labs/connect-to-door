//
//  ctdReimbursementViewController.m
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/22/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdReimbursementViewController.h"
#import "ctdLocalStorage.h"
#import "ctdProfileService.h"
#import "ctdConstants.h"
#import "ctdSelectViewReimbursementCell.h"
#import "ctdColorUtilities.h"

@interface ctdReimbursementViewController ()<UIPickerViewDelegate, UIPickerViewDataSource>
@property (nonatomic, strong) NSArray *pickerViewArray;
@end


@implementation ctdReimbursementViewController

@synthesize listReimbursement;

NSString *employeeId;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        self.hasSignoutButton = NO;
        self.hasBackButton = NO;
    }
    return self;
}

- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    formView.frame = CGRectMake(100, 85, formView.frame.size.width, formView.frame.size.height);
    [self.view addSubview:formView];
    [self createPicker];
    [self configureAllComponent];
    [self setUserDetail];
    // Do any additional setup after loading the view from its nib.
    scrollView.frame = CGRectMake(0, 0, 891, 586);
    [scrollView setContentSize:CGSizeMake(891, 1269)];
   // [listReimbursement setTranslatesAutoresizingMaskIntoConstraints:NO];
    
   
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)setUserDetail
{
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc]init];
    employeeId = localStorage.getEmployeeId;
    ctdProfileService *profileService = [[ctdProfileService alloc] init];
    [profileService handleProfileRequest:EMPLOYEE_ID_PARAMETER :employeeId];
    profileService.delegate = self;
}



- (void)configureAllComponent{
    NSDate *today = [NSDate date];
    dateTodayTxt.text = [self.dateFormatter stringFromDate:today];
    
    datePicker.hidden = TRUE;
    reimbursementPicker.hidden = TRUE;
    toolbarDatePicker.hidden = TRUE;
    
    UIView *paddingView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 5, 20)];
    reimbursementTxt.leftView = paddingView;
    reimbursementTxt.leftViewMode = UITextFieldViewModeAlways;
    
    UIView *paddingViewDatePickerTxt = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 5, 20)];
    dateTxt.leftView = paddingViewDatePickerTxt;
    dateTxt.leftViewMode = UITextFieldViewModeAlways;
    
    UIView *paddingViewDescriptionTxt = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 5, 20)];
    descriptionTxt.leftView = paddingViewDescriptionTxt;
    descriptionTxt.leftViewMode = UITextFieldViewModeAlways;
    
    UIView *paddingViewQuantityTxt = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 5, 20)];
    quantityTxt.leftView = paddingViewQuantityTxt;
    quantityTxt.leftViewMode = UITextFieldViewModeAlways;
    
    UIView *paddingViewCostTxt = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 5, 20)];
    costTxt.leftView = paddingViewCostTxt;
    costTxt.leftViewMode = UITextFieldViewModeAlways;
    
    UIView *paddingViewCaseAdvanceTxt = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 5, 20)];
    cashAdvanceTxt.leftView = paddingViewCaseAdvanceTxt;
    cashAdvanceTxt.leftViewMode = UITextFieldViewModeAlways;
    
}

- (void)createPicker
{
	self.pickerViewArray = @[ @"Meal", @"Transportation", @"Utility" ];
}

- (IBAction)didDatePickerClicked:(id)sender{
    datePicker.hidden = FALSE;
    toolbarDatePicker.hidden = FALSE;
    reimbursementPicker.hidden = TRUE;
}

- (IBAction)didReimbursementTypeClicked:(id)sender{
    reimbursementPicker.hidden = FALSE;
    datePicker.hidden = TRUE;
    toolbarDatePicker.hidden = TRUE;
}

- (NSDateFormatter *)dateFormatter
{
    static NSDateFormatter *dateFormatter = nil;
    if (dateFormatter == nil) {
        dateFormatter = [[NSDateFormatter alloc] init];
        [dateFormatter setDateStyle:NSDateFormatterMediumStyle];
        [dateFormatter setTimeStyle:NSDateFormatterNoStyle];
    }
    return dateFormatter;
}

- (IBAction)didDatePickerSaveBtnTypeClicked:(id)sender{
    //dateTxt.text = [dateFormatter stringFromDate:datePicker.date];
    datePicker.hidden = TRUE;
    toolbarDatePicker.hidden = TRUE;
}
- (IBAction)didDatePickerCancelBtnTypeClicked:(id)sender{
    datePicker.hidden = TRUE;
    toolbarDatePicker.hidden = TRUE;
}

- (IBAction)didBackClicked:(id)sender{
    [self.navigationController popViewControllerAnimated:YES];
}


#pragma service Profile
- (void)didReceiveProfileResponse:(ctdProfileModel*)profileModel
{
    employeeName.text = profileModel.employeeName;
    employeeID.text = profileModel.employeeId;
    projectID.text = profileModel.projectId;
}

- (void)didReceiveProfileErrorResponse:(NSError*)error{
    
}


#pragma mark - UIPickerViewDelegate

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
    if (pickerView == reimbursementPicker){
        reimbursementTxt.text = [self.pickerViewArray objectAtIndex:row];
        reimbursementPicker.hidden = TRUE;
    }
    
}


#pragma mark - UIPickerViewDataSource

- (NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
	return [self.pickerViewArray objectAtIndex:row];
}

- (CGFloat)pickerView:(UIPickerView *)pickerView widthForComponent:(NSInteger)component
{
	return 240.0;
}

- (CGFloat)pickerView:(UIPickerView *)pickerView rowHeightForComponent:(NSInteger)component
{
	return 40.0;
}

- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
	return [self.pickerViewArray count];
}

- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
	return 1;
}


#pragma mark UITableViewDelegate methods

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Return the number of sections.
    return 1;
}

-(NSInteger)tableView:(UITableView *)table numberOfRowsInSection:(NSInteger)section
{
        NSLog(@"numberOfRowsInSection.....");
    return 4;
    
}



- (UITableViewCell *)tableView:(UITableView *)tableView
         cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"cellForRowAtIndexPath.....");
    static NSString *CellIdentifier = @"reimbursementCell";
    ctdSelectViewReimbursementCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        NSArray *topLevelObjects = [[NSBundle mainBundle] loadNibNamed:@"ctdSelectViewReimbursementCell" owner:self options:nil];
        cell = [topLevelObjects objectAtIndex:0];
    }
    if( [indexPath row] % 2 == 0){
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"FFFFFF"]];
    }else{
        [cell.contentView setBackgroundColor:[ctdColorUtilities colorWithHexString:@"cfe9d0"]];
    }
    
    //ctdResponseDailyAttendanceListModel *attendanceItem =[model.getDailyAttendanceListModels objectAtIndex:indexPath.row];
    
    //label Number
    UILabel *numberLabel = [[UILabel alloc] initWithFrame:CGRectMake(0.0, 0, 33.0,tableView.rowHeight)];
    [cell addColumn:50];
    numberLabel.font = [UIFont systemFontOfSize:12.0];
    numberLabel.text = [NSString stringWithFormat:@"%d.", indexPath.row + 1];
    numberLabel.textColor = [UIColor blackColor];
    numberLabel.textAlignment = NSTextAlignmentCenter;
    numberLabel.backgroundColor = [UIColor clearColor];
    [cell.contentView addSubview:numberLabel];
    
      return cell;
}

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    
    // By default, allow row to be selected
    return indexPath;
}

-(CGFloat)tableView:(UITableView*)tableView heightForFooterInSection:(NSInteger)section
{
    return 0.01f;
}


// Override to support conditional editing of the table view.
// This only needs to be implemented if you are going to be returning NO
// for some items. By default, all items are editable.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return YES if you want the specified item to be editable.
    return NO;
}

// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    
}



@end
